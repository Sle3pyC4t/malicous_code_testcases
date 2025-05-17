const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const YOUTUBE_API_KEY_ENCODED = 'QUl6YVN5QmhRWl9WM2pXdUpsb08wT3BGNEJO LVFENklOZC1UZTRv';
const YOUTUBE_API_KEY = Buffer.from(YOUTUBE_API_KEY_ENCODED, 'base64').toString('utf-8');

const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  console.log(`[Temp Dir] Creating directory: ${tempDir}`);
  fs.mkdirSync(tempDir, { recursive: true });
}

try {
  fs.accessSync(tempDir, fs.constants.W_OK);
  console.log(`[Temp Dir] Directory ${tempDir} is writable`);
} catch (err) {
  console.error(`[Temp Dir Error] Directory ${tempDir} is not writable: ${err.message}`);
}

const cookiesPath = path.join(__dirname, '../cookies.txt');

async function searchYouTube(query) {
  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}&maxResults=5`;
    console.log(`[YouTube Search] Hitting API: ${apiUrl}`);
    const searchResponse = await axios.get(apiUrl, { timeout: 10000 });
    if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
      throw new Error('No videos found in API response');
    }

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const detailsResponse = await axios.get(detailsUrl, { timeout: 10000 });

    const videos = searchResponse.data.items.map((item, index) => {
      const details = detailsResponse.data.items[index];
      const duration = details.contentDetails.duration; // e.g., PT2M57S
      const durationFormatted = duration.replace('PT', '').replace('M', 'm ').replace('S', 's').trim();
      return {
        title: item.snippet.title,
        videoId: item.id.videoId,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.high.url,
        author: item.snippet.channelTitle,
        uploaded: new Date(item.snippet.publishedAt).toLocaleDateString('en-US'),
        views: Number(details.statistics.viewCount).toLocaleString(),
        duration: durationFormatted
      };
    });

    return {
      songs: videos.map(video => video.title),
      videoUrls: videos.map(video => video.url),
      videos: videos // Return full video objects for metadata
    };
  } catch (e) {
    console.log(`[YouTube Search Error] Failed: ${e.message}`);
    throw new Error(`YouTube search failed: ${e.message}`);
  }
}

async function downloadYouTube(type, url, quality) {
  try {
    const timestamp = Date.now();
    const fileExtension = type === 'audio' ? 'mp3' : 'mp4';
    const fileName = `${type}_${timestamp}.${fileExtension}`;
    const filePath = path.join(tempDir, fileName);
    const tempFilePath = path.join(tempDir, `temp_${type}_${timestamp}.mp4`);

    let command;
    if (type === 'audio') {
      command = `yt-dlp --cookies "${cookiesPath}" -x --audio-format mp3 --audio-quality 192k --no-warnings -o "${filePath}" "${url}"`;
    } else {
      // Debug: List available formats
      const listFormatsCommand = `yt-dlp --cookies "${cookiesPath}" --list-formats "${url}"`;
      console.log(`[yt-dlp Debug] Listing formats: ${listFormatsCommand}`);
      const { stdout: formatsOutput } = await execPromise(listFormatsCommand);
      console.log(`[yt-dlp Debug] Available formats: ${formatsOutput}`);

      // Try 480p, 720p, then any mp4
      command = `yt-dlp --cookies "${cookiesPath}" -f "bestvideo[height<=480]+bestaudio/bestvideo[height<=720]+bestaudio/best[ext=mp4]" --merge-output-format mp4 --no-warnings -o "${tempFilePath}" "${url}"`;
    }

    console.log(`[yt-dlp Command] Executing: ${command}`);

    const { stdout, stderr } = await execPromise(command);

    console.log(`[yt-dlp Output] stdout: ${stdout}`);
    if (stderr) {
      console.error(`[yt-dlp Output] stderr: ${stderr}`);
    }

    if (type === 'video') {
      // Re-encode with ffmpeg for WhatsApp compatibility
      const ffmpegCommand = `ffmpeg -i "${tempFilePath}" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -movflags +faststart "${filePath}"`;
      console.log(`[ffmpeg Command] Executing: ${ffmpegCommand}`);
      const { stdout: ffmpegStdout, stderr: ffmpegStderr } = await execPromise(ffmpegCommand);
      console.log(`[ffmpeg Output] stdout: ${ffmpegStdout}`);
      if (ffmpegStderr) {
        console.error(`[ffmpeg Output] stderr: ${ffmpegStderr}`);
      }

      // Clean up temp file
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
        console.log(`[Cleanup] Deleted temp file: ${tempFilePath}`);
      }
    }

    if (!fs.existsSync(filePath)) {
      console.error(`[File Check] Expected file ${filePath} not found after download`);
      throw new Error('Download completed but file not found');
    }

    console.log(`[File Check] File ${filePath} successfully created`);
    return { filePath, fileName };
  } catch (e) {
    console.error(`[YouTube Download Error] Failed: ${e.message}`);
    throw new Error(`Download failed. Please try again later or contact the bot owner.`);
  }
}

module.exports = { searchYouTube, downloadYouTube };

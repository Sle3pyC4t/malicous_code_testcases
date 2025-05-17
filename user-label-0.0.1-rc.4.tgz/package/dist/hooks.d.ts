export function useUserLabels(): {
    loading: boolean;
    data: never[];
    flatUserLabels: any;
    run: () => void;
    loadLeaves: (id: any) => Promise<void>;
};

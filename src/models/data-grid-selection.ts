export enum DataGridSelectionMode {
    Single = 'single',
    Multiple = 'multiple',
}

export interface DataGridSelection {
    mode: DataGridSelectionMode;
}

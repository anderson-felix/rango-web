export interface ITabSwitchProps {
  tabs: TabSwitchType[];
  onSwitch: (key: string) => void;
  currentTabColor?: string;
  direction?: 'row' | 'column';
}

export type TabSwitchType = { key: string; label: string; isSelected: boolean };

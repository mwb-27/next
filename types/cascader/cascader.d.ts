import React, { Component, type FocusEvent } from 'react';
import PropTypes from 'prop-types';
import type {
    CascaderDataItem,
    CascaderDataItemWithPosInfo,
    CascaderProps,
    CascaderState,
    V2n,
} from './types';
/**
 * Cascader
 */
declare class Cascader extends Component<CascaderProps, CascaderState> {
    static propTypes: {
        prefix: PropTypes.Requireable<string>;
        rtl: PropTypes.Requireable<boolean>;
        pure: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        dataSource: PropTypes.Requireable<(object | null | undefined)[]>;
        defaultValue: PropTypes.Requireable<
            NonNullable<string | (string | null | undefined)[] | null | undefined>
        >;
        value: PropTypes.Requireable<
            NonNullable<string | (string | null | undefined)[] | null | undefined>
        >;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        defaultExpandedValue: PropTypes.Requireable<(string | null | undefined)[]>;
        expandedValue: PropTypes.Requireable<(string | null | undefined)[]>;
        expandTriggerType: PropTypes.Requireable<string>;
        onExpand: PropTypes.Requireable<(...args: any[]) => any>;
        useVirtual: PropTypes.Requireable<boolean>;
        multiple: PropTypes.Requireable<boolean>;
        canOnlySelectLeaf: PropTypes.Requireable<boolean>;
        canOnlyCheckLeaf: PropTypes.Requireable<boolean>;
        checkStrictly: PropTypes.Requireable<boolean>;
        listStyle: PropTypes.Requireable<object>;
        listClassName: PropTypes.Requireable<string>;
        itemRender: PropTypes.Requireable<(...args: any[]) => any>;
        loadData: PropTypes.Requireable<(...args: any[]) => any>;
        searchValue: PropTypes.Requireable<string>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        filteredPaths: PropTypes.Requireable<any[]>;
        filteredListStyle: PropTypes.Requireable<object>;
        resultRender: PropTypes.Requireable<(...args: any[]) => any>;
        immutable: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        prefix: string;
        rtl: boolean;
        pure: boolean;
        dataSource: never[];
        defaultValue: null;
        canOnlySelectLeaf: boolean;
        canOnlyCheckLeaf: boolean;
        expandTriggerType: string;
        multiple: boolean;
        useVirtual: boolean;
        checkStrictly: boolean;
        itemRender: (item: CascaderDataItem) => React.ReactNode;
        immutable: boolean;
    };
    lastExpandedValue: string[];
    cascader: HTMLDivElement;
    cascaderInner: HTMLDivElement;
    indeterminate: string[];
    constructor(props: CascaderProps);
    static getDerivedStateFromProps(
        props: CascaderProps,
        state: CascaderState
    ): {
        _v2n: V2n;
        _p2n: V2n;
        value?: string[] | undefined;
        isExpandedValueSetByAction?: boolean | undefined;
        expandedValue?: string[] | undefined;
        focusedValue?: string | undefined;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    getCascaderNode(ref: HTMLDivElement): void;
    getCascaderInnerNode(ref: HTMLDivElement): void;
    setCascaderInnerWidth(): void;
    flatValue(value: string[]): string[];
    getValue(pos: string): string | null;
    getPos(value: string): string | null;
    getData(value: string[]): CascaderDataItemWithPosInfo[];
    processValue(value: string[], v: string, checked: boolean): void;
    handleSelect(v: string, canExpand: boolean): void;
    handleCheck(v: string, checked: boolean): void;
    handleExpand(
        value: string,
        level: number,
        canExpand: boolean,
        focusedFirstChild: boolean
    ): void | Promise<void>;
    handleMouseLeave(): void;
    setExpandValue(expandedValue: string[], isExpandedValueSetByAction?: boolean): void;
    getFirstFocusKeyByDataSource(dataSource: Array<CascaderDataItem>): string;
    getFirstFocusKeyByFilteredPaths(filteredPaths: CascaderProps['filteredPaths']): string;
    getFirstFocusKey(): string;
    setFocusValue(): void;
    handleFocus(focusedValue: string): void;
    handleFold(): void;
    getIndeterminate(value: string[]): string[];
    onBlur(e: FocusEvent<HTMLElement>): void;
    renderMenu(data: CascaderProps['dataSource'], level: number): React.JSX.Element;
    renderMenus(): React.JSX.Element[];
    renderFilteredItem(path: CascaderDataItemWithPosInfo[]): React.JSX.Element;
    renderFilteredList(): React.JSX.Element;
    render(): React.JSX.Element;
}
declare const _default: typeof Cascader;
export default _default;

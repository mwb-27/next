/// <reference types="react" />
export type { NumberPickerProps } from './types';
declare const _default: import('../config-provider/types').ConfiguredComponentClass<
    import('./types').NumberPickerProps & import('../config-provider/types').ComponentCommonProps,
    {
        inputRef:
            | (import('../config-provider/types').ConfiguredComponent<
                  import('../input').InputProps &
                      import('../config-provider/types').ComponentCommonProps,
                  import('../input/input').default<import('../input').InputProps>
              > &
                  Pick<
                      import('../input/input').default<import('../input').InputProps>,
                      'focus' | 'getInputNode'
                  >)
            | null;
        isGreaterThan(v1: string | number, v2: string | number): boolean;
        correctBoundary(value: string | number): string | number;
        setFocus(status: boolean): void;
        onFocus: ((e: import('react').FocusEvent<HTMLInputElement, Element>) => void) | undefined;
        onBlur: ((e: import('react').FocusEvent<HTMLInputElement, Element>) => void) | undefined;
        withinMinMax(value: string | number): boolean;
        withinMin(value: string | number): boolean;
        setDisplayValue({
            displayValue,
            onlyDisplay,
        }: {
            displayValue: string | number;
            onlyDisplay?: boolean | undefined;
        }): void;
        getDisplayValue(): string | number;
        shouldFireOnChange(value: string): boolean;
        onChange(
            value: string,
            e:
                | import('react').CompositionEvent<HTMLInputElement>
                | import('react').ChangeEvent<HTMLInputElement>
                | import('react').KeyboardEvent<HTMLInputElement>
        ): void;
        correctValue(value: string): string | number;
        setValue({
            value,
            e,
            triggerType,
        }: {
            value: string | number;
            e:
                | import('react').CompositionEvent<HTMLInputElement>
                | import('react').ChangeEvent<HTMLInputElement>
                | import('react').KeyboardEvent<HTMLInputElement>;
            triggerType?: 'down' | 'up' | undefined;
        }): void;
        getPrecision(): number;
        getPrecisionFactor(): number;
        onKeyDown:
            | ((
                  e: import('react').KeyboardEvent<HTMLInputElement>,
                  opts: import('../input').OnKeyDownOpts
              ) => void)
            | undefined;
        up(disabled: boolean, e: import('react').KeyboardEvent<HTMLInputElement>): void;
        down(disabled: boolean, e: import('react').KeyboardEvent<HTMLInputElement>): void;
        step(
            type: 'down' | 'up',
            disabled: boolean,
            e: import('react').KeyboardEvent<HTMLInputElement>
        ): void;
        upStep(val: string | number): string | number;
        downStep(val: string | number): string | number;
        hackChrome(value: number): number;
        focus(): void;
        saveInputRef(
            ref:
                | (import('../config-provider/types').ConfiguredComponent<
                      import('../input').InputProps &
                          import('../config-provider/types').ComponentCommonProps,
                      import('../input/input').default<import('../input').InputProps>
                  > &
                      Pick<
                          import('../input/input').default<import('../input').InputProps>,
                          'focus' | 'getInputNode'
                      >)
                | null
        ): void;
        getInputNode():
            | (import('../config-provider/types').ConfiguredComponent<
                  import('../input').InputProps &
                      import('../config-provider/types').ComponentCommonProps,
                  import('../input/input').default<import('../input').InputProps>
              > &
                  Pick<
                      import('../input/input').default<import('../input').InputProps>,
                      'focus' | 'getInputNode'
                  >)
            | null;
        handleMouseDown(e: import('react').MouseEvent<HTMLButtonElement, MouseEvent>): void;
        render(): import('react').JSX.Element;
        context: any;
        setState<K extends keyof import('./types').NumberPickerState>(
            state:
                | import('./types').NumberPickerState
                | ((
                      prevState: Readonly<import('./types').NumberPickerState>,
                      props: Readonly<import('./types').NumberPickerProps>
                  ) =>
                      | import('./types').NumberPickerState
                      | Pick<import('./types').NumberPickerState, K>
                      | null)
                | Pick<import('./types').NumberPickerState, K>
                | null,
            callback?: (() => void) | undefined
        ): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import('./types').NumberPickerProps> &
            Readonly<{
                children?: import('react').ReactNode;
            }>;
        state: Readonly<import('./types').NumberPickerState>;
        refs: {
            [key: string]: import('react').ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(
            nextProps: Readonly<import('./types').NumberPickerProps>,
            nextState: Readonly<import('./types').NumberPickerState>,
            nextContext: any
        ): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import('react').ErrorInfo): void;
        getSnapshotBeforeUpdate?(
            prevProps: Readonly<import('./types').NumberPickerProps>,
            prevState: Readonly<import('./types').NumberPickerState>
        ): any;
        componentDidUpdate?(
            prevProps: Readonly<import('./types').NumberPickerProps>,
            prevState: Readonly<import('./types').NumberPickerState>,
            snapshot?: any
        ): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(
            nextProps: Readonly<import('./types').NumberPickerProps>,
            nextContext: any
        ): void;
        UNSAFE_componentWillReceiveProps?(
            nextProps: Readonly<import('./types').NumberPickerProps>,
            nextContext: any
        ): void;
        componentWillUpdate?(
            nextProps: Readonly<import('./types').NumberPickerProps>,
            nextState: Readonly<import('./types').NumberPickerState>,
            nextContext: any
        ): void;
        UNSAFE_componentWillUpdate?(
            nextProps: Readonly<import('./types').NumberPickerProps>,
            nextState: Readonly<import('./types').NumberPickerState>,
            nextContext: any
        ): void;
    },
    Pick<
        {
            inputRef:
                | (import('../config-provider/types').ConfiguredComponent<
                      import('../input').InputProps &
                          import('../config-provider/types').ComponentCommonProps,
                      import('../input/input').default<import('../input').InputProps>
                  > &
                      Pick<
                          import('../input/input').default<import('../input').InputProps>,
                          'focus' | 'getInputNode'
                      >)
                | null;
            isGreaterThan(v1: string | number, v2: string | number): boolean;
            correctBoundary(value: string | number): string | number;
            setFocus(status: boolean): void;
            onFocus:
                | ((e: import('react').FocusEvent<HTMLInputElement, Element>) => void)
                | undefined;
            onBlur:
                | ((e: import('react').FocusEvent<HTMLInputElement, Element>) => void)
                | undefined;
            withinMinMax(value: string | number): boolean;
            withinMin(value: string | number): boolean;
            setDisplayValue({
                displayValue,
                onlyDisplay,
            }: {
                displayValue: string | number;
                onlyDisplay?: boolean | undefined;
            }): void;
            getDisplayValue(): string | number;
            shouldFireOnChange(value: string): boolean;
            onChange(
                value: string,
                e:
                    | import('react').CompositionEvent<HTMLInputElement>
                    | import('react').ChangeEvent<HTMLInputElement>
                    | import('react').KeyboardEvent<HTMLInputElement>
            ): void;
            correctValue(value: string): string | number;
            setValue({
                value,
                e,
                triggerType,
            }: {
                value: string | number;
                e:
                    | import('react').CompositionEvent<HTMLInputElement>
                    | import('react').ChangeEvent<HTMLInputElement>
                    | import('react').KeyboardEvent<HTMLInputElement>;
                triggerType?: 'down' | 'up' | undefined;
            }): void;
            getPrecision(): number;
            getPrecisionFactor(): number;
            onKeyDown:
                | ((
                      e: import('react').KeyboardEvent<HTMLInputElement>,
                      opts: import('../input').OnKeyDownOpts
                  ) => void)
                | undefined;
            up(disabled: boolean, e: import('react').KeyboardEvent<HTMLInputElement>): void;
            down(disabled: boolean, e: import('react').KeyboardEvent<HTMLInputElement>): void;
            step(
                type: 'down' | 'up',
                disabled: boolean,
                e: import('react').KeyboardEvent<HTMLInputElement>
            ): void;
            upStep(val: string | number): string | number;
            downStep(val: string | number): string | number;
            hackChrome(value: number): number;
            focus(): void;
            saveInputRef(
                ref:
                    | (import('../config-provider/types').ConfiguredComponent<
                          import('../input').InputProps &
                              import('../config-provider/types').ComponentCommonProps,
                          import('../input/input').default<import('../input').InputProps>
                      > &
                          Pick<
                              import('../input/input').default<import('../input').InputProps>,
                              'focus' | 'getInputNode'
                          >)
                    | null
            ): void;
            getInputNode():
                | (import('../config-provider/types').ConfiguredComponent<
                      import('../input').InputProps &
                          import('../config-provider/types').ComponentCommonProps,
                      import('../input/input').default<import('../input').InputProps>
                  > &
                      Pick<
                          import('../input/input').default<import('../input').InputProps>,
                          'focus' | 'getInputNode'
                      >)
                | null;
            handleMouseDown(e: import('react').MouseEvent<HTMLButtonElement, MouseEvent>): void;
            render(): import('react').JSX.Element;
            context: any;
            setState<K extends keyof import('./types').NumberPickerState>(
                state:
                    | import('./types').NumberPickerState
                    | ((
                          prevState: Readonly<import('./types').NumberPickerState>,
                          props: Readonly<import('./types').NumberPickerProps>
                      ) =>
                          | import('./types').NumberPickerState
                          | Pick<import('./types').NumberPickerState, K>
                          | null)
                    | Pick<import('./types').NumberPickerState, K>
                    | null,
                callback?: (() => void) | undefined
            ): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<import('./types').NumberPickerProps> &
                Readonly<{
                    children?: import('react').ReactNode;
                }>;
            state: Readonly<import('./types').NumberPickerState>;
            refs: {
                [key: string]: import('react').ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(
                nextProps: Readonly<import('./types').NumberPickerProps>,
                nextState: Readonly<import('./types').NumberPickerState>,
                nextContext: any
            ): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: import('react').ErrorInfo): void;
            getSnapshotBeforeUpdate?(
                prevProps: Readonly<import('./types').NumberPickerProps>,
                prevState: Readonly<import('./types').NumberPickerState>
            ): any;
            componentDidUpdate?(
                prevProps: Readonly<import('./types').NumberPickerProps>,
                prevState: Readonly<import('./types').NumberPickerState>,
                snapshot?: any
            ): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(
                nextProps: Readonly<import('./types').NumberPickerProps>,
                nextContext: any
            ): void;
            UNSAFE_componentWillReceiveProps?(
                nextProps: Readonly<import('./types').NumberPickerProps>,
                nextContext: any
            ): void;
            componentWillUpdate?(
                nextProps: Readonly<import('./types').NumberPickerProps>,
                nextState: Readonly<import('./types').NumberPickerState>,
                nextContext: any
            ): void;
            UNSAFE_componentWillUpdate?(
                nextProps: Readonly<import('./types').NumberPickerProps>,
                nextState: Readonly<import('./types').NumberPickerState>,
                nextContext: any
            ): void;
        },
        'getInputNode'
    >
>;
export default _default;

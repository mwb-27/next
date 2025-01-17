import type { TouchEvent, MouseEvent } from 'react';
import { findDOMNode } from 'react-dom';
import { getTrackCSS, getTrackLeft, getTrackAnimateCSS } from './trackHelper';
import type { InnerSliderProps, InnerSliderState, OptionProps } from '../../types';
import type { MixinThisType as HelpersMixinThisType } from './helpers';

type MixinThisType = {
    props: InnerSliderProps;
    state: InnerSliderState;
    list?: HTMLDivElement;
    track?: HTMLDivElement;
    changeSlide(options: OptionProps): void;
    setState(state: InnerSliderState): void;
    getNavigableIndexes(): number[];
    getSlideCount(): number;
    checkNavigable(index: number): number;
} & HelpersMixinThisType;

const EventHandlers = {
    // Event handler for previous and next
    changeSlide(this: MixinThisType, options: OptionProps) {
        let slideOffset, targetSlide;
        const unevenOffset = this.state.slideCount! % this.props.slidesToScroll! !== 0;
        const indexOffset = unevenOffset
            ? 0
            : (this.state.slideCount! - this.state.currentSlide!) % this.props.slidesToScroll!;

        if (options.message === 'previous') {
            slideOffset =
                indexOffset === 0
                    ? this.props.slidesToScroll
                    : this.props.slidesToShow! - indexOffset;
            targetSlide = this.state.currentSlide! - slideOffset!;
        } else if (options.message === 'next') {
            slideOffset = indexOffset === 0 ? this.props.slidesToScroll : indexOffset;
            targetSlide = this.state.currentSlide! + slideOffset!;
        } else if (options.message === 'dots' || options.message === 'children') {
            // Click on dots
            targetSlide = options.index! * options.slidesToScroll!;
            if (targetSlide === options.currentSlide) {
                return;
            }
        } else if (options.message === 'index') {
            targetSlide = options.index;
            if (targetSlide === options.currentSlide) {
                return;
            }
        }
        this.slideHandler(targetSlide!);
    },

    // Accessibility handler for previous and next
    keyHandler(this: MixinThisType, e: KeyboardEvent) {
        //Don't slide if the cursor is inside the form fields and arrow keys are pressed
        if (!(e.target as HTMLElement).tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (e.keyCode === 37 && this.props.accessibility === true) {
                this.changeSlide({
                    message: this.props.rtl === true ? 'next' : 'previous',
                });
            } else if (e.keyCode === 39 && this.props.accessibility === true) {
                this.changeSlide({
                    message: this.props.rtl === true ? 'previous' : 'next',
                });
            }
        }
    },

    // Focus on selecting a slide (click handler on track)
    selectHandler(this: MixinThisType, options: OptionProps) {
        this.changeSlide(options);
    },

    swipeStart(this: MixinThisType, e: MouseEvent | TouchEvent) {
        if (
            this.props.swipe === false ||
            // @ts-expect-error 这里逻辑上存在重复
            ('ontouchend' in document && this.props.swipe === false)
        ) {
            return;
        } else if (this.props.draggable === false && e.type.indexOf('mouse') !== -1) {
            return;
        }
        const posX = (e as TouchEvent).touches
            ? (e as TouchEvent).touches[0].pageX
            : (e as MouseEvent).clientX;
        const posY = (e as TouchEvent).touches
            ? (e as TouchEvent).touches[0].pageY
            : (e as MouseEvent).clientY;
        this.setState({
            dragging: true,
            touchObject: {
                startX: posX,
                startY: posY,
                curX: posX,
                curY: posY,
            },
        });
    },

    swipeMove(this: MixinThisType, e: MouseEvent | TouchEvent) {
        if (!this.state.dragging) {
            return;
        }
        if (this.state.animating) {
            return;
        }
        const touchObject = this.state.touchObject!;

        const curLeft = getTrackLeft({
            slideIndex: this.state.currentSlide!,
            // @ts-expect-error 这里拿 ref 的方式是不正确的，应该是 this.track
            trackRef: this.refs.track,
            ...this.props,
            ...this.state,
        });

        touchObject.curX = (e as TouchEvent).touches
            ? (e as TouchEvent).touches[0].pageX
            : (e as MouseEvent).clientX;
        touchObject.curY = (e as TouchEvent).touches
            ? (e as TouchEvent).touches[0].pageY
            : (e as MouseEvent).clientY;
        touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(touchObject.curX - touchObject.startX!, 2))
        );

        let positionOffset =
            (this.props.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX! ? 1 : -1);

        if (this.props.verticalSwiping === true) {
            touchObject.swipeLength = Math.round(
                Math.sqrt(Math.pow(touchObject.curY - touchObject.startY!, 2))
            );
            positionOffset = touchObject.curY > touchObject.startY! ? 1 : -1;
        }

        const currentSlide = this.state.currentSlide;
        const dotCount = Math.ceil(this.state.slideCount! / this.props.slidesToScroll!);
        const swipeDirection = this.swipeDirection(this.state.touchObject!);
        let touchSwipeLength = touchObject.swipeLength;

        if (this.props.infinite === false) {
            if (
                (currentSlide === 0 && swipeDirection === 'right') ||
                (currentSlide! + 1 >= dotCount && swipeDirection === 'left')
            ) {
                touchSwipeLength = touchObject.swipeLength * this.props.edgeFriction!;

                if (this.state.edgeDragged === false && this.props.edgeEvent) {
                    this.props.edgeEvent(swipeDirection);
                    this.setState({ edgeDragged: true });
                }
            }
        }

        if (this.state.swiped === false && this.props.swipeEvent) {
            this.props.swipeEvent(swipeDirection);
            this.setState({ swiped: true });
        }

        const swipeLeft = curLeft + touchSwipeLength * positionOffset;
        this.setState({
            touchObject: touchObject,
            swipeLeft: swipeLeft,
            trackStyle: getTrackCSS({
                left: swipeLeft,
                ...this.props,
                ...this.state,
            }),
        });

        if (
            Math.abs(touchObject.curX - touchObject.startX!) <
            Math.abs(touchObject.curY - touchObject.startY!) * 0.8
        ) {
            return;
        }
        if (touchObject.swipeLength > 4) {
            e.preventDefault();
        }
    },

    getNavigableIndexes(this: MixinThisType) {
        let max;
        let breakPoint = 0;
        let counter = 0;
        const indexes = [];

        if (!this.props.infinite) {
            max = this.state.slideCount;
        } else {
            breakPoint = this.props.slidesToShow! * -1;
            counter = this.props.slidesToShow! * -1;
            max = this.state.slideCount! * 2;
        }

        while (breakPoint < max!) {
            indexes.push(breakPoint);
            breakPoint = counter + this.props.slidesToScroll!;

            counter +=
                this.props.slidesToScroll! <= this.props.slidesToShow!
                    ? this.props.slidesToScroll!
                    : this.props.slidesToShow!;
        }

        return indexes;
    },

    checkNavigable(this: MixinThisType, index: number) {
        const navigables = this.getNavigableIndexes();
        let prevNavigable = 0;

        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (const n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    },

    getSlideCount(this: MixinThisType) {
        const centerOffset = this.props.centerMode
            ? this.state.slideWidth! * Math.floor(this.props.slidesToShow! / 2)
            : 0;
        if (this.props.swipeToSlide) {
            let swipedSlide: HTMLElement | undefined;
            const slickList = findDOMNode(this.list) as Element;

            const slides = slickList.querySelectorAll<HTMLElement>(
                `${this.props.prefix}slick-slide`
            );

            Array.from(slides).every(slide => {
                if (!this.props.vertical) {
                    if (
                        slide.offsetLeft - centerOffset + (this.getWidth(slide) || 0) / 2 >
                        this.state.swipeLeft! * -1
                    ) {
                        swipedSlide = slide;
                        return false;
                    }
                } else if (
                    slide.offsetTop + (this.getHeight(slide) || 0) / 2 >
                    this.state.swipeLeft! * -1
                ) {
                    swipedSlide = slide;
                    return false;
                }

                return true;
            });
            const slidesTraversed =
                // @ts-expect-error 此处应被转换为 number 类型
                Math.abs(swipedSlide!.dataset!.index! - this.state.currentSlide) || 1;
            return slidesTraversed;
        } else {
            return this.props.slidesToScroll!;
        }
    },

    swipeEnd(this: MixinThisType, e: MouseEvent | TouchEvent) {
        if (!this.state.dragging) {
            if (this.props.swipe) {
                e.preventDefault();
            }
            return;
        }
        const touchObject = this.state.touchObject!;
        let minSwipe = this.state.listWidth! / this.props.touchThreshold!;
        const swipeDirection = this.swipeDirection(touchObject);

        if (this.props.verticalSwiping) {
            minSwipe = this.state.listHeight! / this.props.touchThreshold!;
        }

        // reset the state of touch related state variables.
        this.setState({
            dragging: false,
            edgeDragged: false,
            swiped: false,
            swipeLeft: null,
            touchObject: {},
        });

        if (!touchObject.swipeLength) {
            return;
        }

        if (touchObject.swipeLength > minSwipe) {
            e.preventDefault();

            let slideCount;
            let newSlide;

            switch (swipeDirection) {
                case 'left':
                case 'down':
                    newSlide = this.state.currentSlide! + this.getSlideCount();
                    slideCount = this.props.swipeToSlide ? this.checkNavigable(newSlide) : newSlide;
                    this.setState({ currentDirection: 0 });
                    break;
                case 'right':
                case 'up':
                    newSlide = this.state.currentSlide! - this.getSlideCount();
                    slideCount = this.props.swipeToSlide ? this.checkNavigable(newSlide) : newSlide;
                    this.setState({ currentDirection: 1 });
                    break;
                default:
                    slideCount = this.state.currentSlide;
            }
            this.slideHandler(slideCount!);
        } else {
            // Adjust the track back to it's original position.
            const currentLeft = getTrackLeft({
                slideIndex: this.state.currentSlide!,
                trackRef: this.track!,
                ...this.props,
                ...this.state,
            });

            this.setState({
                trackStyle: getTrackAnimateCSS({
                    left: currentLeft,
                    ...this.props,
                    ...this.state,
                }),
            });
        }
    },

    onInnerSliderEnter(this: MixinThisType) {
        if (this.props.autoplay && this.props.pauseOnHover) {
            this.pause();
        }
    },

    onInnerSliderLeave(this: MixinThisType) {
        if (this.props.autoplay && this.props.pauseOnHover) {
            this.autoPlay();
        }
    },
};

export default EventHandlers;

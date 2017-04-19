/**
 * Created by Lzzzzzq on 2017/4/11.
 */
import React, {Component} from 'react';

import './index.scss';

let scrollBarWidth = 0;
let shouldUpdate = true;

let wrapHeight = 0;
let contentHeight = 0;
let scrollHeight = 0;
let scrollTop = 0;

let mouseDown = false;
let startPos = 0;
let changePos = 0;

let botFixed = false;

class ScrollBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needScrollBar: false,
            scrollBarTop: 0,
            scrollBarBot: 0,
            realScrollBarWidth: 0,

            scrollBarWidth: 6,              // 滚动条宽度
            // scrollWrapColor: "lightgrey",   // 滚动条容器背景颜色
            // scrollBarColor: "black",        // 滚动条颜色

            scrollWrapColor: "white",
            scrollBarColor: "rgb(193,193,193)",
        };
    }

    componentWillReceiveProps() {
        shouldUpdate = true;
    }

    componentDidUpdate() {
        if (!shouldUpdate) return;
        this.scrollBarStateChange();
        shouldUpdate = false;
    }

    componentDidMount() {
        let scrollContentWrap = this.refs.scrollContentWrap;
        scrollBarWidth = scrollContentWrap.offsetWidth - scrollContentWrap.clientWidth;
        this.setState({
            realScrollBarWidth: scrollBarWidth,
        });
        if (this.props.botFixed) {
            botFixed = this.props.botFixed === "true";
        }
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
        document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
        document.removeEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    scrollBarStateChange() {
        let scrollContentWrap = this.refs.scrollContentWrap;
        let scrollContent = this.refs.scrollContent;
        if (scrollContent.clientHeight < scrollContentWrap.clientHeight) return;

        wrapHeight = scrollContentWrap.clientHeight;
        contentHeight = scrollContent.clientHeight;

        scrollHeight = (wrapHeight / contentHeight * 100).toFixed(2);
        scrollTop = (scrollContentWrap.scrollTop / contentHeight * 100).toFixed(2);

        if (parseInt(this.state.scrollBarBot) == 0 && botFixed == true) {
            this.refs.scrollContentWrap.scrollTop = contentHeight;
            let scrollBarTop = 100 - (parseFloat(scrollHeight));
            let scrollBarBot = 0;
            this.setState({
                scrollBarTop: scrollBarTop,
                scrollBarBot: scrollBarBot,
                needScrollBar: true,
            });
        } else {
            let scrollBarTop = parseFloat(scrollTop);
            let scrollBarBot = 100 - (parseFloat(scrollHeight) + parseFloat(scrollTop));
            this.setState({
                scrollBarTop: scrollBarTop,
                scrollBarBot: scrollBarBot,
                needScrollBar: true,
            });
        }
    }

    handleScroll() {
        let scrollBarTop = (this.refs.scrollContentWrap.scrollTop / contentHeight * 100);
        let scrollBarBot = 100 - (parseFloat(scrollHeight) + parseFloat(scrollBarTop));

        this.setState({
            scrollBarTop: scrollBarTop.toFixed(2),
            scrollBarBot: scrollBarBot.toFixed(2),
        });
    }

    handleMouseDown(e) {
        mouseDown = true;
        startPos = e.clientY;
    }

    handleMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!mouseDown) return;
        changePos = startPos - e.clientY;
        startPos = e.clientY;
        this.refs.scrollContentWrap.scrollTop -= ( changePos * contentHeight / wrapHeight);
    }

    handleMouseUp() {
        if (!mouseDown) return;
        mouseDown = false;
    }

    // handleMouseEnter(){
    //     document.body.style.overflow = "hidden";
    //     document.body.style.paddingRight = scrollBarWidth + "px";
    // }
    // handleMouseLeave(){
    //     document.body.style.overflow = "auto";
    //     document.body.style.paddingRight = 0;
    // }
    render() {
        let scrollBar = "";
        if (this.state.needScrollBar) {
            scrollBar = (
                <div
                    className="scrollBarWrap"
                    style={{
                        width: this.state.scrollBarWidth + "px",
                        borderRadius: this.state.scrollBarWidth / 2 + "px",
                        backgroundColor: this.state.scrollWrapColor,
                    }}
                >
                    <div
                        className="scrollBar"
                        style={{
                            top: this.state.scrollBarTop + "%",
                            bottom: this.state.scrollBarBot + "%",
                            backgroundColor: this.state.scrollBarColor,
                        }}
                        onMouseDown={this.handleMouseDown.bind(this)}
                    ></div>
                </div>
            );
        } else {
            scrollBar = (
                <div
                    className="scrollBarWrap"
                    style={{
                        width: "8px",
                        backgroundColor: "white",
                    }}
                >
                </div>
            );
        }
        return (
            <div
                className="scrollBoxWrap"
            >
                {scrollBar}
                <div
                    className="scrollContentWrap"
                    ref="scrollContentWrap"
                    onScroll={this.handleScroll.bind(this)}
                    style={{
                        right: "-" + this.state.realScrollBarWidth + "px",
                    }}
                >
                    <div
                        className="scrollContent"
                        ref="scrollContent"
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ScrollBox;

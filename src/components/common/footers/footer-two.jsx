import React, {Component} from 'react';
import { Link} from 'react-router-dom';

class FooterTwo extends Component {

    constructor(props){
        super(props);

        this.state = {
            divName:'RTL',
            colorPick:false
        }
    }
    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /*=====================
     Tap on Top
     ==========================*/
    handleScroll = () => {
        if (document.documentElement.scrollTop > 600) {
            document.querySelector(".tap-top").style = "display: block";
        } else {
            document.querySelector(".tap-top").style = "display: none";
        }
    }
    clickToTop(){
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }
    ChangeRtl(divName){
        if(divName === 'RTL') {
            document.body.classList.add('rtl');
            this.setState({divName: 'LTR'});
        }else{
            document.body.classList.remove('rtl');
            this.setState({divName: 'RTL'});
        }
    }
    componentDidMount(){
        // var contentwidth = window.innerWidth;
        // if ((contentwidth) < 750) {
        //     document.querySelector(".footer-title h4").innerHTML += '<span class="according-menu"></span>';

        //     var anchors = document.getElementsByClassName('footer-title');
        //     for(var i = 0; i < anchors.length; i++) {
        //         var anchor = anchors[i];
        //         anchor.onclick = function() {
        //             var elems = document.querySelectorAll(".footer-title");
        //             [].forEach.call(elems, function(elemt) {
        //                 elemt.classList.remove("active");
        //                 var el = elemt.nextElementSibling;

        //                 el.style.height = el.offsetHeight + 'px'
        //                 el.style.transitionProperty = `height, margin, padding`
        //                 el.style.transitionDuration = '500ms'
        //                 el.offsetHeight // eslint-disable-line no-unused-expressions
        //                 el.style.overflow = 'hidden'
        //                 el.style.height = 0
        //                 el.style.paddingTop = 0
        //                 el.style.paddingBottom = 0
        //                 el.style.marginTop = 0
        //                 el.style.marginBottom = 0
        //                 el.style.display = 'none'
        //                 el.style.removeProperty('height')
        //                 el.style.removeProperty('padding-top')
        //                 el.style.removeProperty('padding-bottom')
        //                 el.style.removeProperty('margin-top')
        //                 el.style.removeProperty('margin-bottom')
        //                 el.style.removeProperty('overflow')
        //                 el.style.removeProperty('transition-duration')
        //                 el.style.removeProperty('transition-property')

        //             });

        //                 this.classList.add('active');
        //                 var element = this.nextElementSibling;
        //                 element.style.removeProperty('display')
        //                 let display = window.getComputedStyle(element).display
        //                 if (display === 'none') display = 'block'
        //                 element.style.display = display
        //                 let height = element.offsetHeight
        //                 element.style.overflow = 'hidden'
        //                 element.style.height = 0
        //                 element.style.paddingTop = 0
        //                 element.style.paddingBottom = 0
        //                 element.style.marginTop = 0
        //                 element.style.marginBottom = 0
        //                 element.offsetHeight // eslint-disable-line no-unused-expressions
        //                 element.style.transitionProperty = `height, margin, padding`
        //                 element.style.transitionDuration = '500ms'
        //                 element.style.height = height + 'px'
        //                 element.style.removeProperty('padding-top')
        //                 element.style.removeProperty('padding-bottom')
        //                 element.style.removeProperty('margin-top')
        //                 element.style.removeProperty('margin-bottom')
        //                 window.setTimeout(function () {
        //                     element.style.removeProperty('height')
        //                     element.style.removeProperty('overflow')
        //                     element.style.removeProperty('transition-duration')
        //                     element.style.removeProperty('transition-property')
        //                 }, 500)
        //         }
        //     }

        //     var elems = document.querySelectorAll(".footer-title");
        //     [].forEach.call(elems, function(elemt) {
        //         let el = elemt.nextElementSibling;
        //         el.style = "display: none";
        //     });
        // } else {
        //     var elems = document.querySelectorAll(".footer-title");
        //     [].forEach.call(elems, function(elemt) {
        //         let el = elemt.nextElementSibling;
        //         el.style = "display: block";
        //     });
        // }


        /*=====================
         Pre loader
         ==========================*/
        setTimeout(function() {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);
    }

    showHideColor(){
        this.setState({colorPick: !this.state.colorPick})
    }

    changeColor(color){
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/`+color+`.css` );
    }

    render () {
        let color_style = this.state.colorPick ? {right:'0px'}: {right:'-190px'};
        let tap_to_top = {display: 'none'}
        return (
            <footer id={"footer"} className="footer-light">
                <div className="sub-footer ">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="footer-end">
                                    <p><i className="fa fa-copyright" aria-hidden="true"></i> 2020 SFHWFH
                                        powered by KarpaLabs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="addcart_btm_popup" id="fixed_cart_icon">
                    <a href={null} className="fixed_cart" onClick={ () => this.ChangeRtl(this.state.divName)}>
                        {this.state.divName}
                    </a>
                </div>
                <div className="color-picker" style={color_style}>
                    <a href="#" className="handle" onClick={this.showHideColor.bind(this)}><i className="fa fa-cog"></i></a>
                    <div className="sec-position">
                        <div className="settings-header">
                            <h3>Select Color1:</h3>
                        </div>
                        <div className="section">
                            <div className="colors o-auto">
                                <a href="#" className="color1" onClick={() => this.changeColor('color1')}></a>
                                <a href="#" className="color2" onClick={() => this.changeColor('color2')}></a>
                                <a href="#" className="color3" onClick={() => this.changeColor('color3')}></a>
                                <a href="#" className="color4" onClick={() => this.changeColor('color4')}></a>
                                <a href="#" className="color5" onClick={() => this.changeColor('color5')}></a>
                                <a href="#" className="color6" onClick={() => this.changeColor('color6')}></a>
                                <a href="#" className="color7" onClick={() => this.changeColor('color7')}></a>
                                <a href="#" className="color8" onClick={() => this.changeColor('color8')}></a>
                                <a href="#" className="color9" onClick={() => this.changeColor('color9')}></a>
                                <a href="#" className="color10" onClick={() => this.changeColor('color10')}></a>
                                <a href="#" className="color11" onClick={() => this.changeColor('color11')}></a>
                                <a href="#" className="color12" onClick={() => this.changeColor('color12')}></a>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="tap-top top-cls" onClick={this.clickToTop} style={tap_to_top}>
                    <div>
                        <i className="fa fa-angle-double-up"></i>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterTwo;
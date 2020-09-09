import React, { Component } from 'react';

class FooterTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divName: 'RTL',
      colorPick: false
    };
  }
  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // Tap on Top
  handleScroll = () => {
    if (document.documentElement.scrollTop > 600) {
      document.querySelector('.tap-top').style = 'display: block';
    } else {
      document.querySelector('.tap-top').style = 'display: none';
    }
  };
  clickToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  ChangeRtl(divName) {
    if (divName === 'RTL') {
      document.body.classList.add('rtl');
      this.setState({ divName: 'LTR' });
    } else {
      document.body.classList.remove('rtl');
      this.setState({ divName: 'RTL' });
    }
  }
  componentDidMount() {
    setTimeout(function () {
      document.querySelector('.loader-wrapper').style = 'display: none';
    }, 2000);
  }

  showHideColor() {
    this.setState({ colorPick: !this.state.colorPick });
  }

  changeColor(color) {
    document.getElementById('color').setAttribute('href', `${process.env.PUBLIC_URL}/assets/css/` + color + `.css`);
  }

  render() {
    let tap_to_top = { display: 'none' };
    return (
      <footer id={'footer'} className='footer-light'>
        <div className='sub-footer '>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-md-6 col-sm-12'>
                <div className='footer-end'>
                  <p>
                    <i className='fa fa-copyright' aria-hidden='true'></i> 2020 SinauNgomah powered by KarpaLabs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tap-top top-cls' onClick={this.clickToTop} style={tap_to_top}>
          <div>
            <i className='fa fa-angle-double-up'></i>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterTwo;

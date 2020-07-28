import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import {
  onChangeStateUpdatePassword,
  updatePassword,
  setUpdatePasswordCode
} from '../../actions';

class UpdatePassword extends Component {
  state = {
    newPasswordModal: false
  };

  constructor(props) {
    console.log("update-password called")
    super(props);

    this.validator = new SimpleReactValidator();
    // const {setUpdatePasswordCode} = this.props
    // setUpdatePasswordCode(this.props.match.params.id)
  }

  componentDidMount() {
    document.getElementById('footer').style.display = 'none';
    document.getElementById('sticky').style.display = 'none';
  }


  onClickUpdatePassword() {
    let { updatePassword, onChangeStateUpdatePassword } = this.props;
    onChangeStateUpdatePassword('code', this.props.match.params.code);
    updatePassword();
  }

  renderView() {
    const { accountState, onChangeStateUpdatePassword } = this.props;

    return (
      <div>
        <section className='login-page section-b-space'>
          <div className='container'>
            <div className='row row d-flex justify-content-center'>
              <div className='col-lg-4'>
                <div className={'text-center'}>
                  <h5>Perbarui kata sandi</h5>
                </div>

                <div className='theme-card'>
                  <form className='theme-form'>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='text'
                        className='form-control'
                        id='email'
                        placeholder='Email'
                        onChange={(e) =>
                          onChangeStateUpdatePassword(
                            e.target.id,
                            e.target.value
                          )
                        }
                        autoComplete={'email'}
                      />
                      {this.validator.message(
                        'email',
                        accountState.updatePassword.email,
                        'required'
                      )}
                    </div>
                    <div className='form-group'>
                      <label htmlFor='review'>Masukkan kata sandi baru</label>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Enter your password'
                        onChange={(e) =>
                          onChangeStateUpdatePassword(
                            e.target.id,
                            e.target.value
                          )
                        }
                        autoComplete={'password'}
                      />
                      {this.validator.message(
                        'password',
                        accountState.updatePassword.password,
                        'required'
                      )}
                    </div>
                    <div className='form-group'>
                      <label htmlFor='review'>Ulangi kata sandi baru</label>
                      <input
                        type='password'
                        className='form-control'
                        id='repeatPassword'
                        placeholder='Enter your password'
                        onChange={(e) =>
                          onChangeStateUpdatePassword(
                            e.target.id,
                            e.target.value
                          )
                        }
                        autoComplete={'password'}
                      />
                      {this.validator.message(
                        'password',
                        accountState.updatePassword.password,
                        'required'
                      )}
                    </div>

                    
                    <div className={'text-center'}>
                      <a
                        onClick={() => {
                          this.onClickUpdatePassword();
                        }}
                        className='btn btn-solid'>
                        Ganti kata sandi
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  render() {
    const { accountState } = this.props;

    return (
      <BlockUi
        tag='div'
        blocking={accountState.loader}
        message={
          <span>
            <div id='preloader'>
              <div id='loader' />
            </div>
          </span>
        }>
        {this.renderView()}
      </BlockUi>
    );
  }
}

// export default UpdatePassword
const mapStateToProps = (state) => ({
  accountState: state.account
});

export default connect(mapStateToProps, {
  onChangeStateUpdatePassword,
  updatePassword,
  setUpdatePasswordCode
})(UpdatePassword);

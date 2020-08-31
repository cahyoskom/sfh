import {
  ADMIN_GET_GROUP_LIST,
  ADMIN_GET_GROUP_LIST_SUCCESS,
  ADMIN_GET_USER_LIST,
  ADMIN_GET_USER_LIST_SUCCESS,
  ADMIN_GET_CLASS_LIST,
  ADMIN_GET_CLASS_LIST_SUCCESS,
  ADMIN_GET_SUBJECT_LIST,
  ADMIN_GET_SUBJECT_LIST_SUCCESS,
  ADMIN_GET_STUDENT_LIST,
  ADMIN_GET_STUDENT_LIST_SUCCESS,
  ADMIN_GET_ROLE_LIST,
  ADMIN_GET_ROLE_LIST_SUCCESS,
  ADMIN_GET_DATASOURCE_CLASS,
  ADMIN_GET_DATASOURCE_CLASS_SUCCESS,
  ADMIN_GET_DATASOURCE_GROUP,
  ADMIN_GET_DATASOURCE_GROUP_SUCCESS,
  ADMIN_GET_DATASOURCE_SUBJECT,
  ADMIN_GET_DATASOURCE_SUBJECT_SUCCESS,
  ADMIN_GET_DATASOURCE_STUDENT,
  ADMIN_GET_DATASOURCE_STUDENT_SUCCESS,
  ADMIN_SET_MODAL_FORM_USER,
  ADMIN_SET_MODAL_FORM_USER_ROLE,
  ADMIN_SET_MODAL_FORM_GROUP,
  ADMIN_SET_MODAL_FORM_CLASS,
  ADMIN_SET_MODAL_FORM_SUBJECT,
  ADMIN_SET_MODAL_FORM_STUDENT,
  GET_TASK_GURU_LIST,
  GET_TASK_GURU_LIST_SUCCESS,
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_SUCCESS,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  SET_MODAL,
  SET_MODAL_FORM,
  SET_LOADER,
  SET_DATE,
  SET_TASK_LIST_FILTER,
  DELETE_TASK,
  SET_STATE_TASK_DETAIL,
  HANDLE_STATE_UPDATE_TASK
} from '../constants/ActionTypes';

const initialState = {
  group: {
    dataGroup: [],
    form: {},
    dataSourceGroup: []
  },
  user: {
    dataUser: [],
    dataUserById: {},
    form: {
      user_name: '',
      email: '',
      password: ''
    },
    formRole: {
      user_id: '',
      group_id: '',
      class_id: '',
      subject_id: '',
      student_id: ''
    }
  },
  class: {
    dataClass: [],
    form: {
      class_level: '',
      class_parallel: '',
      class_name: ''
    },
    dataSourceClass: []
  },
  subject: {
    dataSubject: [],
    form: {
      subject_name: ''
    },
    dataSourceSubject: []
  },
  student: {
    dataStudent: [],
    form: {
      student_name: '',
      student_no: '',
      sex: '',
      class_id: ''
    },
    sexOption: [
      { label: 'Laki-laki', value: '1' },
      { label: 'Perempuan', value: '2' }
    ],
    dataSourceStudent: []
  },
  role: {
    dataRole: [],
    dataRoleById: [],
    form: {
      // subject_name:""
    },
    dataSourceRole: []
  },
  formUploadCsv: {
    files: null
  },

  data: [],
  filter: {
    class_id: [],
    subject_id: [],
    start_date: new Date(),
    finish_date: new Date()
  },
  now: new Date(),
  modal: {
    show: false,
    type: '',
    title: '',
    buttonText: ''
  },
  dataSourceSubject: [],
  dataSourceClass: [],
  loader: false,
  key: Math.random()
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_GET_GROUP_LIST:
      return {
        ...state
      };
    case ADMIN_GET_GROUP_LIST_SUCCESS: {
      return {
        ...state,
        group: {
          ...state.group,
          [action.field]: action.value
        }
      };
    }
    case ADMIN_GET_USER_LIST:
      return {
        ...state
      };
    case ADMIN_GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          [action.field]: action.value
        }
      };
    }
    case ADMIN_GET_CLASS_LIST:
      return {
        ...state
      };
    case ADMIN_GET_CLASS_LIST_SUCCESS: {
      return {
        ...state,
        class: {
          ...state.class,
          [action.field]: action.value
        }
      };
    }
    case ADMIN_GET_SUBJECT_LIST:
      return {
        ...state
      };
    case ADMIN_GET_SUBJECT_LIST_SUCCESS: {
      return {
        ...state,
        subject: {
          ...state.subject,
          [action.field]: action.value
        }
      };
    }
    case ADMIN_GET_STUDENT_LIST:
      return {
        ...state
      };
    case ADMIN_GET_STUDENT_LIST_SUCCESS: {
      return {
        ...state,
        student: {
          ...state.student,
          [action.field]: action.value
        }
      };
    }
    case ADMIN_GET_ROLE_LIST:
      return {
        ...state
      };
    case ADMIN_GET_ROLE_LIST_SUCCESS: {
      return {
        ...state,
        role: {
          ...state.role,
          [action.field]: action.value
        }
      };
    }
    case ADMIN_SET_MODAL_FORM_USER:
      return {
        ...state,
        user: {
          ...state.user,
          form: {
            ...state.user.form,
            [action.field]: action.value
          }
        }
      };
    case ADMIN_SET_MODAL_FORM_USER_ROLE:
      return {
        ...state,
        user: {
          ...state.user,
          formRole: {
            ...state.user.formRole,
            [action.field]: action.value
          }
        }
      };
    case ADMIN_SET_MODAL_FORM_GROUP:
      return {
        ...state,
        group: {
          ...state.group,
          form: {
            ...state.group.form,
            [action.field]: action.value
          }
        }
      };
    case ADMIN_SET_MODAL_FORM_CLASS:
      return {
        ...state,
        class: {
          ...state.class,
          form: {
            ...state.class.form,
            [action.field]: action.value
          }
        }
      };
    case ADMIN_SET_MODAL_FORM_SUBJECT:
      return {
        ...state,
        subject: {
          ...state.subject,
          form: {
            ...state.subject.form,
            [action.field]: action.value
          }
        }
      };
    case ADMIN_SET_MODAL_FORM_STUDENT:
      return {
        ...state,
        student: {
          ...state.student,
          form: {
            ...state.student.form,
            [action.field]: action.value
          }
        }
      };
    case ADMIN_GET_DATASOURCE_CLASS:
      return {
        ...state
      };
    case ADMIN_GET_DATASOURCE_CLASS_SUCCESS:
      return {
        ...state,
        class: {
          ...state.class,
          [action.field]: action.value
        }
      };
    case ADMIN_GET_DATASOURCE_GROUP:
      return {
        ...state
      };
    case ADMIN_GET_DATASOURCE_GROUP_SUCCESS:
      return {
        ...state,
        group: {
          ...state.group,
          [action.field]: action.value
        }
      };
    case ADMIN_GET_DATASOURCE_SUBJECT:
      return {
        ...state
      };
    case ADMIN_GET_DATASOURCE_SUBJECT_SUCCESS:
      return {
        ...state,
        subject: {
          ...state.subject,
          [action.field]: action.value
        }
      };
    case ADMIN_GET_DATASOURCE_STUDENT:
      return {
        ...state
      };
    case ADMIN_GET_DATASOURCE_STUDENT_SUCCESS:
      return {
        ...state,
        student: {
          ...state.student,
          [action.field]: action.value
        }
      };

    case SET_TASK_LIST_FILTER:
      return {
        ...state,
        // dt: {
        //     ...state.dt,
        //     filter: {
        //         ...state.dt.filter,
        //         [action.field]: action.value
        //     }
        // }
        filter: {
          ...state.filter,
          [action.field]: action.value
        }
      };
    case GET_TASK_GURU_LIST:
      return {
        ...state
      };
    case GET_TASK_GURU_LIST_SUCCESS: {
      return {
        ...state,
        // data: action.value
        [action.field]: action.value
      };
    }
    case GET_SUBJECT_LIST:
      return {
        ...state
      };
    case GET_SUBJECT_LIST_SUCCESS: {
      return {
        ...state,
        [action.field]: action.value
      };
    }
    case GET_CLASS_LIST:
      return {
        ...state
      };
    case GET_CLASS_LIST_SUCCESS: {
      return {
        ...state,
        [action.field]: action.value
      };
    }
    case SET_DATE:
      return {
        ...state
        // stardet: action.value
      };
    case SET_LOADER:
      return {
        ...state,
        loader: action.value
      };
    case SET_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.field]: action.value
        }
      };
    // case DELETE_TASK:
    //   return {
    //     ...state,
    //     deletedIds: action.payload
    //   };
    case SET_STATE_TASK_DETAIL:
      return {
        ...state,
        taskDetail: action.value
      };
    case HANDLE_STATE_UPDATE_TASK:
      return {
        ...state,
        taskDetail: { ...state.taskDetail, [action.field]: action.value }
      };
    case SET_MODAL_FORM:
      return {
        ...state,
        formUploadCsv: {
          ...state.formUploadCsv,
          [action.field]: action.value
        }
      };
    default:
  }
  return state;
}


class API {
  /**
   * 新闻列表
   * @returns {Promise<any>}
   */
  getNewList () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/news/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            title: ''
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生列表
   * @returns {Promise<any>}
   */
  getDocList (province) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            province: province,
            city: '',
            docName: ''
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生信息
   * @param docId
   * @returns {Promise<any>}
   */
  getDocInfo (docId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/detail',
        data: {
          id: docId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 新闻信息
   * @param newsId
   * @returns {Promise<any>}
   */
  getNewsInfo (newsId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/news/detail',
        data: {
          id: newsId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者问诊订单列表
   * @param patId
   * @returns {Promise<any>}
   */
  getOrderList (patId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/order/interrogation/patientList',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: patId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者问诊订单详情
   * @param ordId
   * @returns {Promise<any>}
   */
  getOrderInfo (ordId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/order/interrogation/detail',
        data: {
          id: ordId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生课程订单列表
   * @param docId
   * @returns {Promise<any>}
   */
  getOrderCourseList (docId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/orders/course/docList',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: docId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生课程订单详情
   * @param ordId
   * @returns {Promise<any>}
   */
  getOrderCourseInfo (ordId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/orders/course/detail',
        data: {
          id: ordId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者问诊订单已付款未付款列表
   * @param patId
   * @param status
   * @returns {Promise<any>}
   */
  getOrderStatusList (patId, status) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/order/interrogation/patientList',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: patId,
            status: status
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生课程订单已付款未付款列表
   * @param docId
   * @param status
   * @returns {Promise<any>}
   */
  getOrderCourseStatusList (docId, status) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/orders/course/docList',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: docId,
            status: status
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 个人中心协议
   * @returns {Promise<any>}
   */
  getAgreementInfo () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/agreement/detail',
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者报告列表
   * @param patId
   * @returns {Promise<any>}
   */
  getPatReportList (patId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/report/list/patient',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: patId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者病例列表
   * @param patId
   * @returns {Promise<any>}
   */
  getCaseList (userId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/history/list',
        data: {
          id: userId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者详情
   * @param patientId
   * @returns {Promise<any>}
   */
  getCaseDetail (patientId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/history/get',
        data: {
          id: patientId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者详情
   * @param formData
   * @returns {Promise<any>}
   */
  addCaseDetail (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/history/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 添加报告
   * @param formData
   * @returns {Promise<any>}
   */
  reportAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/report/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 报告详情
   * @param reportId
   * @returns {Promise<any>}
   */
  getReportInfo (caseId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/report/detailByHistoryId',
        data: {
          id: caseId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 添加热搜
   * @param formData
   * @returns {Promise<any>}
   */
  searchAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/search/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 热搜前6
   * @returns {Promise<any>}
   */
  searchHot () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/search/hot',
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 我的消息医生患者通用
   * @param userId
   * @param userType
   * @returns {Promise<any>}
   */
  getMsgList (userId, userType) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/msg/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            userType: userType,
            userId: userId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 添加消息
   * @param formData
   * @returns {Promise<any>}
   */
  msgAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/msg/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 添加患者
   * @param formData
   * @returns {Promise<any>}
   */
  patientAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 添加医生
   * @param formData
   * @returns {Promise<any>}
   */
  doctorAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者问诊添加订单，评价，积分
   * @param formData
   * @returns {Promise<any>}
   */
  orderAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/order/interrogation/save',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 我的患者
   * @param docId
   * @returns {Promise<any>}
   */
  getMyPat (docId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/mePatient',
        data: {
          id: docId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生课程列表
   * @param courseTitle
   * @returns {Promise<any>}
   */
  getCourseList (typeId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/course/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            type: typeId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生课程详情
   * @param couresId
   * @returns {Promise<any>}
   */
  getCourseInfo (couresId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/course/detail',
        data: {
          id: couresId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 医生课程添加订单
   * @param formData
   * @returns {Promise<any>}
   */
  orderCourseAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/orders/course/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 文章列表
   * @param title
   * @returns {Promise<any>}
   */
  getArticleList (title) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/article/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            title: title
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 文章列表
   * @param title
   * @returns {Promise<any>}
   */
  getArticleListAll (title) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/article/listAll',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            title: title
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 文章详情
   * @param articleId
   * @returns {Promise<any>}
   */
  getArticleInfo (articleId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/article/detail',
        data: {
          id: articleId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 随访提醒
   * @param formData
   * @returns {Promise<any>}
   */
  remindAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/remind/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 随访时间设置
   * @param formData
   * @returns {Promise<any>}
   */
  remindConfigAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/remind/config/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 随访列表
   * @param docId
   * @returns {Promise<any>}
   */
  getremindList (docId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/remind/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: docId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 文章详情
   * @param remindId
   * @returns {Promise<any>}
   */
  getRemindInfo (remindId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/remind/config/detail',
        data: {
          id: remindId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 验证邀请码
   * @param docId
   * @param code
   * @returns {Promise<any>}
   */
  getCodeMsg (docId, code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/code/edit',
        data: {
          doc: {
            id: docId
          },
          code: code
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 随访时间设置
   * @param formData
   * @returns {Promise<any>}
   */
  studyAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/study/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  studyFind (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://localhost:8000/api/wx/study/find',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 随访列表
   * @returns {Promise<any>}
   */
  getHotDocList () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/hot',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 新闻banner查询
   * @returns {Promise<any>}
   */
  getBanner () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/news/banner',
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 查询医生的支出收益账单
   * @param docId
   * @returns {Promise<any>}
   */
  getDocBill (docId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/bill/list',
        data: {
          pageInfo: {
            currentPage: 0,
            sizePerPage: 50
          },
          params: {
            id: docId
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }

  /**
   * 患者详情
   * @param patientId
   * @returns {Promise<any>}
   */
  getPatientDetail (patientId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/detail',
        data: {
          id: patientId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 医生查询总和
   * @param docId
   * @returns {Promise<any>}
   */
  getDocTotal (docId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/bill/sum',
        data: {
          id: docId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 根据OpenId查询用户信息
   * @param docId
   * @returns {Promise<any>}
   */
  getUserByOpenId (openId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/userType',
        data: {
          openId: openId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 获取附件
   * @param formData
   * @returns {Promise<any>}
   */
  enclosureList (name) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/enclosure/list',
        method: 'POST',
        data: {
          name: name
        },
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 获取附件列表
   * @param formData
   * @returns {Promise<any>}
   */
  enclosureFindAll () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/enclosure/findAll',
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 添加患者
   * @param formData
   * @returns {Promise<any>}
   */
  feedBackAdd (formData) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/feedback/add',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 获取全部医生列表
   * @returns {Promise<any>}
   */
  getBaseDocs () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/selectList',
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
  /**
   * 医生带教列表
   * @returns {Promise<any>}
   */
  getExpDocList () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/expertEducatio',
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          resolve(res)
        }
      })
    })
  }
}

export default new API()

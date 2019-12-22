import API from '../api'

const getNewList = async () => {
  const res = (await API.getNewList()).data.data.content
  const newList = res
  return { newList }
}
const getDocList = async (province) => {
  const res = (await API.getDocList(province)).data.data.content
  const docList = res
  return { docList }
}
const getDocInfo = async (docId) => {
  const res = (await API.getDocInfo(docId)).data.data
  const docInfo = res
  return { docInfo }
}
const getNewsInfo = async (newsId) => {
  const res = (await API.getNewsInfo(newsId)).data.data
  const newsInfo = res
  return { newsInfo }
}
const getOrderList = async (patId) => {
  const res = (await API.getOrderList(patId)).data.data.content
  const orderList = res
  return { orderList }
}
const getOrderInfo = async (ordId) => {
  const res = (await API.getOrderInfo(ordId)).data.data
  const orderInfo = res
  return { orderInfo }
}
const getOrderCourseList = async (docId) => {
  const res = (await API.getOrderCourseList(docId)).data.data.content
  const orderCourseList = res
  return { orderCourseList }
}
const getOrderCourseInfo = async (ordId) => {
  const res = (await API.getOrderCourseInfo(ordId)).data.data
  const orderCourseInfo = res
  return { orderCourseInfo }
}
const getOrderStatusList = async (patId, status) => {
  const res = (await API.getOrderStatusList(patId, status)).data.data.content
  const orderList = res
  return { orderList }
}
const getOrderCourseStatusList = async (docId, status) => {
  const res = (await API.getOrderCourseStatusList(docId, status)).data.data.content
  const orderCourseList = res
  return { orderCourseList }
}
const getAgreementInfo = async () => {
  const res = (await API.getAgreementInfo()).data.data
  const agreementInfo = res
  return { agreementInfo }
}
const getPatReportList = async (patId) => {
  const res = (await API.getPatReportList(patId)).data.data.content
  const reportList = res
  return { reportList }
}
const reportAdd = async (formData) => {
  const res = (await API.reportAdd(formData)).data
  const status = res
  return { status }
}
const getReportInfo = async (reportId) => {
  const res = (await API.getReportInfo(reportId)).data.data
  const reportInfo = res
  return { reportInfo }
}
const searchAdd = async (formData) => {
  const res = (await API.searchAdd(formData)).data.status
  const status = res
  return { status }
}
const searchHot = async () => {
  const res = (await API.searchHot()).data.data
  const searchHotList = res
  return { searchHotList }
}
const getMsgList = async (userId, userType) => {
  const res = (await API.getMsgList(userId, userType)).data.data.content
  const msgList = res
  return { msgList }
}
const msgAdd = async (formData) => {
  const res = (await API.msgAdd(formData)).data.status
  const status = res
  return { status }
}
const patientAdd = async (formData) => {
  const res = (await API.patientAdd(formData)).data.status
  const status = res
  return { status }
}
const doctorAdd = async (formData) => {
  const res = (await API.doctorAdd(formData)).data.status
  const status = res
  return { status }
}
const orderAdd = async (formData) => {
  const res = (await API.orderAdd(formData)).data
  const status = res
  return { status }
}
const getMyPat = async (docId) => {
  const res = (await API.getMyPat(docId)).data.data
  const myPatInfo = res
  return {myPatInfo}
}
const getCourseList = async (typeId) => {
  const res = (await API.getCourseList(typeId)).data.data.content
  const courseList = res
  return {courseList}
}
const getCourseInfo = async (couresId) => {
  const res = (await API.getCourseInfo(couresId)).data.data
  const courseInfo = res
  return {courseInfo}
}
const orderCourseAdd = async (formData) => {
  const res = (await API.orderCourseAdd(formData)).data.status
  const status = res
  return { status }
}
const getArticleList = async (courseTitle) => {
  const res = (await API.getArticleList(courseTitle)).data.data.content
  const articleList = res
  return { articleList }
}
const getArticleInfo = async (articleId) => {
  const res = (await API.getArticleInfo(articleId)).data.data
  const articleInfo = res
  return { articleInfo }
}
const remindAdd = async (formData) => {
  const res = (await API.remindAdd(formData)).data.status
  const status = res
  return { status }
}
const remindConfigAdd = async (formData) => {
  const res = (await API.remindConfigAdd(formData)).data.status
  const status = res
  return { status }
}
const getremindList = async (docId) => {
  const res = (await API.getremindList(docId)).data.data.content
  const remindList = res
  return { remindList }
}
const getRemindInfo = async (remindId) => {
  const res = (await API.getRemindInfo(remindId)).data.data
  const remindInfo = res
  return { remindInfo }
}
const getCodeMsg = async (docId, code) => {
  const res = (await API.getCodeMsg(docId, code)).data.status
  const codeMsg = res
  return { codeMsg }
}
const studyAdd = async (formData) => {
  const res = (await API.studyAdd(formData)).data.status
  const status = res
  return { status }
}
const getHotDocList = async () => {
  const res = (await API.getHotDocList()).data.data.content
  const hotDocList = res
  return { hotDocList }
}
const getBanner = async () => {
  const res = (await API.getBanner()).data.data.content
  const banner = res
  return { banner }
}
const getDocBill = async (docId) => {
  const res = (await API.getDocBill(docId)).data.data.content
  const docBill = res
  return { docBill }
}
const getPatientDetail = async (patientId) => {
  const res = (await API.getPatientDetail(patientId)).data.data
  const patientDetail = res
  return { patientDetail }
}
const getDocTotal = async (docId) => {
  const res = (await API.getDocTotal(docId)).data.data
  const docTotal = res
  return { docTotal }
}
const getUserByOpenId = async (openId) => {
  const res = (await API.getUserByOpenId(openId))
  const userDetail = res
  return { userDetail }
}
const getEnclosureList = async (name) => {
  const res = (await API.enclosureList(name)).data
  const enclosureList = res
  return { enclosureList }
}
const enclosureFindAll = async (name) => {
  const res = (await API.enclosureFindAll()).data
  const enclosureList = res
  return { enclosureList }
}
const feedBackAdd = async (formData) => {
  const res = (await API.feedBackAdd(formData)).data.status
  const status = res
  return { status }
}
const getBaseDocs = async () => {
  const res = (await API.getBaseDocs()).data.data
  const allDocList = res
  return { allDocList }
}
const getExpDocList = async () => {
  const res = (await API.getExpDocList()).data.data
  const expDocList = res
  return { expDocList }
}

export {
  getNewList, getDocList, getDocInfo, getNewsInfo, getOrderList, getOrderInfo, getOrderCourseList, getOrderCourseInfo, getOrderStatusList,
  getOrderCourseStatusList, getAgreementInfo, getPatReportList, reportAdd, getReportInfo, searchAdd, searchHot, getMsgList, msgAdd,
  patientAdd, doctorAdd, orderAdd, getMyPat, getCourseList, getCourseInfo, orderCourseAdd, getArticleList, getArticleInfo, remindAdd,
  remindConfigAdd, getremindList, getRemindInfo, getCodeMsg, studyAdd, getHotDocList, getBanner, getDocBill, getPatientDetail, getDocTotal,
  getUserByOpenId, getEnclosureList, feedBackAdd, getBaseDocs, getExpDocList, enclosureFindAll
}

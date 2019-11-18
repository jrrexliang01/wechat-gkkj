import API from '../api'

const getNewList = async () => {
  const res = (await API.getNewList()).data.data.content
  return { res }
}
const getDocList = async () => {
  const res = (await API.getDocList()).data.data.content
  return { res }
}
const getDocInfo = async (docId) => {
  const res = (await API.getDocInfo(docId)).data.data
  return { res }
}
const getNewsInfo = async (newsId) => {
  const res = (await API.getNewsInfo(newsId)).data.data
  return { res }
}
const getOrderList = async (patId) => {
  const res = (await API.getOrderList(patId)).data.data.content
  return { res }
}
const getOrderInfo = async (ordId) => {
  const res = (await API.getOrderInfo(ordId)).data.data
  return { res }
}
const getOrderCourseList = async (docId) => {
  const res = (await API.getOrderCourseList(docId)).data.data.content
  return { res }
}
const getOrderCourseInfo = async (ordId) => {
  const res = (await API.getOrderCourseInfo(ordId)).data.data
  return { res }
}
const getOrderStatusList = async (patId, status) => {
  const res = (await API.getOrderStatusList(patId, status)).data.data.content
  return { res }
}
const getOrderCourseStatusList = async (docId, status) => {
  const res = (await API.getOrderCourseStatusList(docId, status)).data.data.content
  return { res }
}
const getAgreementInfo = async () => {
  const res = (await API.getAgreementInfo()).data.data
  return { res }
}
const getPatReportList = async (patId) => {
  const res = (await API.getPatReportList(patId)).data.data.content
  return { res }
}
const reportAdd = async (formData) => {
  const res = (await API.reportAdd(formData)).data.msg
  return { res }
}
const getReportInfo = async (reportId) => {
  const res = (await API.getReportInfo(reportId)).data.data
  return { res }
}
const searchAdd = async (formData) => {
  const res = (await API.searchAdd(formData)).data.msg
  return { res }
}
const searchHot = async () => {
  const res = (await API.searchHot()).data.data
  return { res }
}
const getMsgList = async (userId, userType) => {
  const res = (await API.getMsgList(userId, userType)).data.data.content
  return { res }
}
const msgAdd = async (formData) => {
  const res = (await API.msgAdd(formData)).data.msg
  return { res }
}
const patientAdd = async (formData) => {
  const res = (await API.patientAdd(formData)).data.msg
  return { res }
}
const doctorAdd = async (formData) => {
  const res = (await API.doctorAdd(formData)).data.msg
  return { res }
}
const orderAdd = async (formData) => {
  const res = (await API.orderAdd(formData)).data.msg
  return { res }
}
const getMyPat = async (docId) => {
  const res = (await API.getMyPat(docId)).data.data
  return { res }
}
const getCourseList = async (courseTitle) => {
  const res = (await API.getCourseList(courseTitle)).data.data.content
  return { res }
}
const getCourseInfo = async (couresId) => {
  const res = (await API.getCourseInfo(couresId)).data.data
  return { res }
}
const orderCourseAdd = async (formData) => {
  const res = (await API.orderCourseAdd(formData)).data.msg
  return { res }
}
const getArticleList = async (courseTitle) => {
  const res = (await API.getCourseList(courseTitle)).data.data.content
  return { res }
}
const getArticleInfo = async (articleId) => {
  const res = (await API.getArticleInfo(articleId)).data.data
  return { res }
}
const remindAdd = async (formData) => {
  const res = (await API.remindAdd(formData)).data.msg
  return { res }
}
const remindConfigAdd = async (formData) => {
  const res = (await API.remindConfigAdd(formData)).data.msg
  return { res }
}
const getremindList = async (docId) => {
  const res = (await API.getCourseList(docId)).data.data.content
  return { res }
}
const getRemindInfo = async (remindId) => {
  const res = (await API.getArticleInfo(remindId)).data.data
  return { res }
}
const getCodeMsg = async (docId, code) => {
  const res = (await API.getCodeMsg(docId, code)).data.msg
  return { res }
}
const studyAdd = async (formData) => {
  const res = (await API.studyAdd(formData)).data.msg
  return { res }
}
const getHotDocList = async () => {
  const res = (await API.getHotDocList()).data.data.content
  return { res }
}

const getBanner = async () => {
  const res = (await API.getBanner()).data.data.content
  return { res }
}
const getDocBill = async (docId) => {
  const res = (await API.getDocBill(docId)).data.data.content
  return { res }
}

const getPatientDetail = async (patientId) => {
  const res = (await API.getPatientDetail(patientId)).data.data.content
  return { res }
}

export {
  getNewList, getDocList, getDocInfo, getNewsInfo, getOrderList, getOrderInfo, getOrderCourseList, getOrderCourseInfo, getOrderStatusList,
  getOrderCourseStatusList, getAgreementInfo, getPatReportList, reportAdd, getReportInfo, searchAdd, searchHot, getMsgList, msgAdd,
  patientAdd, doctorAdd, orderAdd, getMyPat, getCourseList, getCourseInfo, orderCourseAdd, getArticleList, getArticleInfo, remindAdd,
  remindConfigAdd, getremindList, getRemindInfo, getCodeMsg, studyAdd, getHotDocList, getBanner, getDocBill, getPatientDetail
}

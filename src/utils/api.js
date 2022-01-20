
import request from '@/utils/request'
/**
 * 获得所有身份List
 */
export async function getRoleList(from) {
	return request({
		url: '/user_stream/role/listRole',
		method: 'post',
		data: from
	})
}


/**
 *修改身份状态
 */
 export async function reNewOrDisable(from) {
	return request({
		url: '/user_stream/role/reNewOrDisable',
		method: 'put',
		data: from
	})
}


/**
 *导出身份
 */
 export async function exportRole(params) {
	return request({
		url: '/user_stream/role/export',
		method: 'get',
		params: params
	})
}



/**
 * 账号密码登入
 */
 export async function loginPwd(from) {
	return request({
		url: '/user_stream/login/loginPwd',
		method: 'post',
		data: from
	})
}


/**
 * 手机或者邮件登入
 */
 export async function login(from) {
	return request({
		url: '/user_stream/login/login',
		method: 'post',
		data: from
	})
}


/**
 * 发送验证码
 */
 export async function sendMsg(from) {
	return request({
		url: '/user_stream/login/sendMsg',
		method: 'post',
		data: from
	})
}


/**
 * 注册
 */
 export async function register(from) {
	return request({
		url: '/user_stream/login/register',
		method: 'post',
		data: from
	})
}
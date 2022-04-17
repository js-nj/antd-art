let rootPath = 'http://www.zhaolai.net:6012';
// let rootPath = 'http://api.yuntuyixue.cn';
export default {
	ProductDetails: rootPath + '/WebService.asmx/ProductDetails',
	OrderAdd: rootPath + '/WebService.asmx/OrderAdd',
	UserLogin: rootPath + '/WebService.asmx/UserLogin',
	SMSPost: rootPath + '/WebService.asmx/SMSPost',
	OrderList: rootPath + '/WebService.asmx/OrderList',
	StudentIndexGet: rootPath + '/WebService.asmx/StudentIndexGet', //废弃
	StudentIndexNew: rootPath + '/WebService.asmx/StudentIndexNew',
	GetWxUser: rootPath + '/WebService.asmx/GetWxUser',
	ProductList: rootPath + '/WebService.asmx/ProductList',
	WXPay: rootPath + '/WebService.asmx/WXPay',
	PayList: rootPath + '/WebService.asmx/PayList',
	AppleBalance: rootPath + '/WebService.asmx/AppleBalance',

	OfficeDetails: rootPath + '/WebService.asmx/OfficeDetails',
	TeacherList: rootPath + '/WebService.asmx/TeacherList',
	TeacherDetails: rootPath + '/WebService.asmx/TeacherDetails',
	OfficeList: rootPath + '/WebService.asmx/OfficeList',

	ProductPrice: rootPath + '/WebService.asmx/ProductPrice',
	CMSList: rootPath + '/WebService.asmx/CMSList',
	CMSDetails: rootPath + '/WebService.asmx/CMSDetails',
}
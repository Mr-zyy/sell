/*
 *解析url
 *@example ?id=123&a=b
 *return object{id:123, a:b}
 */
export function urlParse() {
	let url = window.location.search
	let newUrl = url.substring(1)
	let arr = newUrl.split('&')
	// ['id=12', 'a=b']
	let obj = {}
	arr.forEach((item) => {
		let arr1 = item.split('=')
		let key = arr1[0]
		let value = arr1[1]
		obj[key] = value
	})
	return obj
}

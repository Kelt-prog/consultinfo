function handleUserList(userList) {
	let userString = '';
	userList.forEach(item => {
		userString += `
		<tr>
			<td class=""><img src="${item.avatar}"/></td>
			<td class="">${item.id}</td>
			<td class="">${item.first_name}</td>
			<td class="">${item.last_name}</td>
			<td class="">${item.email}</td>
		</tr>`;
	})
	const tbody = document.querySelector('.table tbody');
	tbody.insertAdjacentHTML('afterbegin', userString);
}


handleUserList(userList);
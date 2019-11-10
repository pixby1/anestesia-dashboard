function removeUser(url, id) {
  fetch(`${url}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id })
  })
    .then(() => {
      console.log('The user was successfully deleted');
    })
    .catch(err => {
      console.log(`problems removing user: ${err}`);
    });
}

export { removeUser };

function createUser(url, item) {
  fetch(`${url}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: item.name,
      lastName: item.lastName,
      age: item.age,
      email: item.email,
      phone: item.phone,
      birthday: item.birthday,
      gender: item.gender,
      nationality: item.nationality,
      address: item.address,
      specialty: item.specialty,
      subSpecialty: item.subSpecialty,
      resident: item.resident,
      userID: item.userID,
      society: item.society
    })
  })
    .then(() => {
      console.log('The user was created successfully');
    })
    .catch(err => {
      console.log(`Problems creating the user: ${err}`);
    });
}

export { createUser };

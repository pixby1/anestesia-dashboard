function count(userList) {
  const total = userList.length;
  let totalRes = 0;
  let totalAnes = 0;
  for (const user of userList) {
    if (user.jobRole === 'residente') {
      totalRes += 1;
    }
    if (user.jobRole === 'anestesiólogo') {
      totalAnes += 1;
    }
  }
  return {
    total,
    totalRes: totalRes || 0,
    totalAnes: totalAnes || 0
  };
}

export { count };

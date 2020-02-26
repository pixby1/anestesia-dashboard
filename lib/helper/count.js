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

function stats(userList) {
  const counter = new Map();
  for (const user of userList) {
    const { country, jobRole } = user;
    if (!counter.has(country)) {
      counter.set(country, {
        total: 0
      });
    }
    const existing = counter.get(country);
    existing.total += 1;
    if (!existing[jobRole]) {
      existing[jobRole] = 0;
    }
    existing[jobRole] += 1;
  }
  return counter;
}

export { count, stats };

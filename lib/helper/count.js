function count(userList) {
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

export { count };

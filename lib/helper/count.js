function count(userList) {
  const counter = new Map();
  for (const user of userList) {
    const { society, jobRole } = user;
    if (!counter.has(society)) {
      counter.set(society, {
        total: 0
      });
    }
    const existing = counter.get(society);
    existing.total += 1;
    if (!existing[jobRole]) {
      existing[jobRole] = 0;
    }
    existing[jobRole] += 1;
  }
  return counter;
}

export { count };

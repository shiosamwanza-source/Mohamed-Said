/* ==========================================================
   DOCUMENTS PAGE CONTROLS (Search & Filters)
========================================================== */
.documents-controls {
  margin-bottom: 40px;
  text-align: center;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.filter-btn {
  padding: 8px 20px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: var(--muted);
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  color: #111;
  border-color: var(--primary);
}

/* Skeleton Card (Loading Animation) */
.skeleton-card {
  background: var(--card);
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid var(--border);
}

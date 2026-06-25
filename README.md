# document-management-system

#How to sync the code from the forked repository to the original repository

Here r1 : https://github.com/Saurabh240/document-management-system.git
and r2 : https://github.com/contactgsmllc/document-management-system-Saurab.git
---

# ✅ Step 1 — Add r1 as upstream (one time setup)

Inside your local clone of r2:

```bash
git remote -v
```

If you don’t see r1 listed, add it:

```bash
git remote add upstream https://github.com/Saurabh240/document-management-system.git
```

Verify:

```bash
git remote -v
```

You should see:

```
origin     -> r2
upstream   -> r1
```

---

# ✅ Step 2 — Fetch latest changes from r1

```bash
git fetch upstream
```

This pulls r1 branches locally without merging.

---

# ✅ Step 3 — Switch to your r2 dev branch

```bash
git checkout dev
```

Make sure it’s clean:

```bash
git status
```

---

# ✅ Step 4 — Merge r1 main into r2 dev

```bash
git merge upstream/main
```

If no conflicts → done.

If conflicts:

* Fix manually
* `git add .`
* `git commit`

---

# ✅ Step 5 — Push updated dev branch to r2

```bash
git push origin dev
```

Now:

> r2/dev contains latest r1/main + your dev changes.

---

# 🔥 Cleaner Alternative (Keeps History Linear)

If you prefer cleaner history:

```bash
git rebase upstream/main
```

Instead of merge.

⚠ Use rebase only if dev is not shared heavily.

---

# 🚀 One-Line Summary

```bash
git fetch upstream
git checkout dev
git merge upstream/main
git push origin dev
```

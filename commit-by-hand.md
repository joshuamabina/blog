# Git internals (1)

## Plumbing and Porcelian

In the early days of Git, the user interface was much more complex, rather than the commands we know and love today.

This was so, because, git emphasized on being more of a toolkit to work hand-in-hand with the UNIX filesystem tools.

The much more complex commands are referred to as "plumbing", and the more user friendly commands as "porcelian".

### Some porcelain commands

git init

```bash
# Initialize a new local Git repository.
git init [directory]
```

git commit

```bash
# Record staged changes to the repository.
git commit -m "My changes"
```
git checkout

```bash
# Create and switch to a new branch.
git checkout -b branch_name

# Switch to an existing local branch.
git checkout branch_name

# Discard unstaged changes to a given file.
git checkout file_name

# Discard all unstaged changes.
git checkout .
```

### Some plumbing commands

- cat-file
- update-ref
- hash-object
- update-index
- write-tree
- commit-tree

## Commit by hand

### A git commit visualized

When you run git commit, Git creates... Here's what it looks like:

```bash
commit
|    {
|        hash: 37a0ab5,
|        tree: 057762f,
|        parent: nil,
|        committer: Darth Maul,
|        message: Initial commit!
|    }
|- tree [057762f]
    |   {
    |       tree: cda80f5  assets
    |       blob: 37a0ab5  index.php
    |   }
    |- blob [37a0ab5]
    |       <html>
    |           <body>
    |               <?php echo "Hello world!" ?>
    |           </body>
    |       </html>
    |- tree [cda80f5]
        |        blob: 51c1f7c  app.js
        |        blob: 057762f  app.css
        |-blob [51c1f7c]
        |   $(function() {
        |       console.log("Hello world!");
        |   });
        |- blob [057762f]
        |   body {
        |       background: #000;
        |       color: #fff;
        |   }
```

### The dot git directory

Git stores everything it creates and manipulates in a `.git` directory. Here's what it looks like:

```bash
hooks/
objects/
branches/
info/
refs/
config*
description
HEAD
```
git-hash-object

> Compute object ID and optionally creates a blob from a file.

### Creating a blob using git-hash-object

```bash
# -w
#   actually write the object into the object database.

# --stdin
#   reads input from standard input instead of from a file.

echo "We meet again, Kenobi. Welcome... to my world." | \
git hash-object -w --stdin
```

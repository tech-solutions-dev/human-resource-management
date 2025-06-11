# COLLOBORATION GUIDE
After accepting the invitation to github collaboration, each of us can now clone the repository to our local machine. 
(I will now use the second person to address us throughout)

1.  **Navigate to the Repository on GitHub:** Go to `https://github.com/tech-solutions-dev/human-resource-management`.
2.  **Click the "Code" Button:** On the repository page, click the green "Code" button.
3.  **Copy the HTTPS URL:** Copy the URL provided (e.g., `https://github.com/tech-solutions-dev/our-current-project-name.git`).
4.  **Open Terminal/Git Bash (or use GitHub Desktop):**
    ```bash
    # Navigate to the directory where you want to store the project
    cd /path/to/your/development/folder

    # Clone the repository
    git clone https://github.com/tech-solutions-dev/human-resource-management.git
    # Change into the cloned directory
    cd human-rosource-management
    ```
    *If using GitHub Desktop, click "Clone a Repository," then "URL," paste the URL, choose a local path, and click "Clone."*

#### **Collaborating: Pulling, Making Changes, Pushing**

Now that everyone has cloned the repository, here's the typical workflow:

1.  **Before Starting Work (Always!): Pull the Latest Changes**
    Before you begin working on a feature or fixing a bug, *always* pull the latest changes from the remote repository to ensure your local copy is up-to-date with what other developers might have pushed.
    ```bash
    git pull origin main # or master
    ```

2.  **Create a New Branch (Recommended Best Practice):**
    It's crucial to work on separate branches for new features or bug fixes. This isolates your changes from the main codebase until they are ready and reviewed.
    ```bash
    git checkout -b your-feature-branch-name
    ```
    (e.g., `git checkout -b feature/user-authentication` or `git checkout -b bugfix/login-issue`)

3.  **Make Your Changes:**
    Write your code, create new files, modify existing ones, etc.

4.  **Stage Your Changes:**
    Tell Git which files you want to include in your next commit.
    ```bash
    git add . # Adds all changed files in the current directory and subdirectories
    # or
    git add path/to/your/file.js # Adds a specific file
    ```

5.  **Commit Your Changes:**
    Record your changes in your local repository with a descriptive message.
    ```bash
    git commit -m "Brief description of the feature/fix you implemented"
    ```

6.  **Push Your Branch to GitHub:**
    Share your new branch and its commits with the remote repository. The first time you push a new branch, you'll need to set the upstream.
    ```bash
    git push -u origin your-feature-branch-name
    ```
    For subsequent pushes to the same branch, you can just use:
    ```bash
    git push
    ```

7.  **Create a Pull Request (PR) (Highly Recommended):**
    Once your feature/fix on your branch is complete and you want to merge it into the `main` (or `master`) branch:
    * Go to the repository on GitHub.
    * GitHub will usually detect your recently pushed branch and offer a "Compare & pull request" button. Click it.
    * Fill out the PR title and description. Explain what your changes do.
    * Assign reviewers (other team members) if desired.
    * Click "Create pull request."

8.  **Review and Merge:**
    * Other team members can review your code in the PR, leave comments, and suggest changes.
    * Once the code is approved (often requiring at least one "approve" review), someone with merge permissions (Timo or any team member with write access) can click the "Merge pull request" button.
    * After merging, you can delete your feature branch from GitHub (optional, but good for cleanup).

9.  **Back to Main Branch (and Repeat):**
    After your branch is merged, switch back to your `main` branch, pull the latest changes (which now include your merged code), and repeat the cycle for your next task.
    ```bash
    git checkout main # or master
    git pull origin main # or master
    ```

---

### Key GitHub Collaboration Best Practices:

* **Branching Strategy:** Always work on branches, not directly on `main` (or `master`). This prevents breaking the main codebase and allows for isolated development.
    * **Feature Branches:** For new functionalities.
    * **Bugfix Branches:** For addressing bugs.
    * **Hotfix Branches:** For critical, immediate fixes on production.
* **Descriptive Commit Messages:** Write clear, concise commit messages that explain *what* changes were made and *why*.
* **Regular Pulls:** `git pull origin main` frequently to stay updated with your teammates' work.
* **Pull Requests (PRs):** Use PRs for code review. This is where your team catches bugs, improves code quality, and shares knowledge.
* **Code Review:** Actively participate in reviewing your teammates' PRs.
* **Resolve Conflicts:** Occasionally, two developers might modify the same lines of code, leading to merge conflicts. Git will alert you to these, and you'll need to manually resolve them before merging.
* **Communication:** Talk to your teammates! Inform them when you're starting a new feature, if you run into problems, or if you're about to push a major change.
* **`.gitignore`:** Use a `.gitignore` file to tell Git to ignore files that shouldn't be tracked (e.g., compiled binaries, temporary files, `node_modules`, `.env` files with sensitive information). This should be part of our initial setup.

By following these steps and best practices, our team should be able to collaborate efficiently and effectively on our GitHub repository. Hope this is useful to us!

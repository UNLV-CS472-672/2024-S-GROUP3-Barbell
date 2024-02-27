# Barbell Project - Group 3

The repository for the Barbell project, Group 3.

Quickstart (Deprecated):

- [Installation](https://scribehow.com/shared/Quickstart_Barbell___I7R2_mESL68FTCAMcbF8w)
- [Issue Board + Development](https://scribehow.com/shared/Issue_and_start_working_on_Barbell__ibGJtJNdRfqZ1aucOCC0sg)
- [When you fininishing your issue](#)

There will be merge conflicts, so do check out the resources here of how to resolve them:

- [youtube vid](https://www.youtube.com/watch?v=QmKdodJU-js)
- [blog](https://leonardomontini.dev/merge-conflict-vscode/)
- [vscode docs](https://code.visualstudio.com/docs/sourcecontrol/overview)

Whenever you want to sync with the main branch, get the latest main branch and then merge it with your branch. This will help you to avoid merge conflicts.

```bash
# in your local branch, even if your changes doens't affect the main
# we would still do this to not stash changes
git add .
git commit -m "messages"
git push

# after clean the status of your local, now check out the main branch
git checkout main
git fetch && git pull

# now go back to your branch and merge the main branch
git checkout your-branch

# at this point you have two options
# 1. merge the main branch with your branch
git merge --no-ff main

# 2. rebase the main branch with your branch
git rebase main
```

That's it! You are now up to date with the main branch. Now submit and write that sweet PR.

## Git Commit Convention
1. Use present tense in your commit messages. For example, use "✨feature: Add xyz to component qrs" instead of "✨feature: Added xyz to component qrs". ([Source](https://stackoverflow.com/questions/3580013/should-i-use-past-or-present-tense-in-git-commit-messages))
2. Use the emojis below to distinguish what type of change you have made in your commit. This will help keep commit messages consistent and easier to read. For example, "📚docs: Update commit conventions in README.md".
- ✨**feature**: Introduces completely new code or new features.
- 🐛**fix**: Implements changes that fix a bug. Ideally, reference an issue if present.
- ♻️**refactor**: Includes any code-related change that is neither a fix nor a feature.
- ✅**build**: Encompasses all changes related to the build of the software, including changes to dependencies or the addition of new ones.
- ⚡️**test**: Pertains to all changes regarding tests, whether adding new tests or modifying existing ones.
- 🚰**ci**: Involves all changes related to the configuration of continuous integration, such as GitHub Actions or other CI systems.
- 📚**docs**: Includes all changes to documentation, such as README files, or any other documentation present in the repository.
- 🗑️**chore**: Captures all changes to the repository that do not fit into the above categories.

## Fields for GitHub Issue Boards

For effective project management and prioritization, our GitHub issue boards utilize the following fields:

### Priority

- **High**: Urgent tasks that need to be addressed as soon as possible.
- **Medium**: Important tasks that should be completed in the near future.
- **Low**: Less critical tasks that can be addressed when convenient.
- **No Priority**: Tasks that can be completed at any time without immediate urgency.

### Size

Indicates the overall scope and effort required for a task, measured in:

- **XS**: Extra Small
- **S**: Small
- **M**: Medium
- **L**: Large
- **XL**: Extra Large

### Assigned To

Tasks are assigned to team members by their first name. For tasks with multiple assignees, names are comma-separated.

# Template for Issues

For opening up an issue, you can follow the following template:

```markdown
## Description

Provide a concise summary of the issue, highlighting the core aspect that needs attention or resolution. Elaborate on the issue, including what prompted it, its impact, and any relevant details that will aid in understanding the scope and urgency of the problem.

Include any links, documents, or resources that could provide further context or information relevant to the issue.

- Resource 1: [Link](#)
- Resource 2: [Link](#)

## Requirements

Outline the specific objectives and requirements needed to finish the issue. Clearly state what success looks like for this issue.

- [ ] Requirement 1:
- [ ] Requirement 2:
- [ ] Requirement 3:
- [ ] Requirement 4:

## (Optional)

If you have potential solutions or approaches in mind, please outline them here. This section is optional and can include any preliminary ideas or alternative strategies.

1. **Solution 1**:
2. **Solution 2**:

## Further Comments

Add any additional comments or notes that haven't been covered above. This could include concerns, observations, or any other relevant information.
```

---

<div align="center" style="background-color: #000000; border-radius: 8px; padding: 20px; margin: 20px 0;">
  <strong>Note:</strong> This README is a work in progress and will be updated as the project progresses. Not strictly enforced, just a template for you to START with.
</div>

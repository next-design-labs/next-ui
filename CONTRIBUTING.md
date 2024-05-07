# Contribution guidelines

We welcome all contributions to our project! Here are a few guidelines that will help you along the way:

- [Getting started](#getting-started)
- [Question or problem?](#question-or-problem)
- [Submitting an issue](#submitting-an-issue)
- [Submitting a pull request](#submitting-a-pull-request)
- [Coding standards](#coding-standards)
- [Commit message guidelines](#commit-message-guidelines)
- [Testing](#testing)

## Getting Started?

```sh
# Clone the repository
git clone https://github.com/next-design-labs/next-ui.git
cd next-ui

# Install the dependencies
pnpm install

# Start the storybook dev environment
pnpm storybook
```

## Question or problem?

Use GitHub issues for bug reports and feature requests or one of our available communication channels for general support questions.

## Submitting an issue

You can file new issues by selecting from our [issue templates]() and filling out the selected template.
Before submitting an issue, please search the repository, as your issue might have been already answered.

### Bugs 🐛

If your issue appears to be a bug, please report it by opening [a new bug report]().

Even better if you submit a Pull Request with the fix instead.

### Feature requests ✨

You can request a new feature by submitting an issue to this repo.
Features can be **new components** or changes to **existing components**.

## Submitting a pull request

Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.

All contributions should target the `master` branch or a previous major version. Maintainers will be responsible for reviewing and merging the Pull Request.

### Setup

1. Pull the latest `master` branch.
2. Always work and submit pull requests from a branch:
   ```sh
   git checkout -b YOUR_BRANCH_NAME master
   ```
3. Make sure you follow our [coding standards](#coding-standards), and add new test cases where appropriate following the [testing guidelines](#testing).
4. Commit your changes using a descriptive commit message that follows our [commit message guidelines](#commit-message-guidelines).
5. Once ready for feedback from other contributors and maintainers, push your commits to your fork:
   ```sh
   git push YOUR_FORK_REMOTE YOUR_BRANCH_NAME
   ```
6. Open a Pull Request. The title should follow the same [guidelines of the commit message](#commit-message-guidelines) (most of the times it can simply be the same than the first commit message).

Maintainers will be reviewing your work, making comments, asking questions and suggesting changes to be made before they merge your code.
Once all revisions to your merge request are complete, a maintainer will squash and merge your commits for you.

**That's it! Thank you for your contribution!**

## Coding standards

We enforce some style and formatting rules for source code using [Biome](https://biomejs.dev/).
Most popular IDEs have plugins that will following our linting and formatting rules. Alternatively, you can run `pnpm check` to get a report of the issues.

Any issues not fixed will be caught during CI, and will prevent merging.
## Commit message guidelines

We enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specs over how our git commit messages should be formatted.
This leads to more readable messages that are easy to follow when looking through the project history. The git commit messages are also used to generate the change log.

Commits must be prefixed with a `type` in order to communicate intent, an optional `scope` may be provided after a type.

### Type

Must be one of the following:

- `feat:` a feature that is visible for end users.
- `fix:` a bugfix that is visible for end users.
- `chore:` a change that doesn't impact end users (e.g. chances to CI pipeline)
- `docs:` a change on the documentation
- `refactor:` a change in production code focused on readability, style and/or performance.
- Others commit types are allowed, for example: `style:`, `perf:`, `test:`.

Examples:

```
docs: correct spelling of CHANGELOG
feat(lang): added polish language
fix(button): minor typos in code, fixes #12
```

## Testing

If you add any features to our code, make sure to add tests so that your changes are covered.

Test your changes by running our test commands:

```
pnpm test
```

We also execute regression tests in all pull requests and releases against the a11y standards (accessibility static analysis), end-to-end tests (using Playwright) and visual tests using Chromatic. Please keep an eye on the pull request result for detailed feedback.
// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "danger/distribution/dsl/DangerDSL"
import { DangerResults } from "danger/distribution/dsl/DangerResults"
declare var danger: DangerDSLType
declare var results: DangerResults
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

import * as alexChecker from "alex"

interface Issue {
  message: string
  line: number
}

const findPRParams = path => ({ ...danger.github.thisPR, path, ref: danger.github.pr.head.ref })
export const githubRepresentationForPath = (value: string) => {
  if (value.includes("@")) {
    return {
      path: value.split("@")[1] as string,
      owner: value.split("@")[0].split("/")[0] as string,
      repo: value.split("@")[0].split("/")[1] as string,
    }
  }
}
/**
 * Catch insensitive, inconsiderate writing with alex.
 */
export default async function alex() {
  const changedFiles = [...danger.git.modified_files, ...danger.git.created_files]

  for (const file of changedFiles) {
    const params = findPRParams(file)
    const contents = await danger.github.utils.fileContents(params.path, `${params.owner}/${params.repo}`, params.ref)
    if (contents) {
      await alexCheck(file, contents)
    }
  }
}

export const alexCheck = async (file: string, sourceText: string) => {
  const issues = alexChecker(sourceText).messages

  if (issues.length > 0) {
    markdown(`
      ### Issues for ${danger.github.utils.fileLinks([file])}
      | Line | Issue |
      | ---- | ---- |
      ${issues.map(issueToMarkdown).join("\n")}
    `)
  }
}

const issueToMarkdown = (issue: Issue) => {
  return `${issue.line} | ${issue.message}`
}

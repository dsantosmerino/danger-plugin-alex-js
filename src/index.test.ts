import { alexCheck } from "./index"

declare const global: any

beforeEach(() => {
  global.warn = jest.fn()
  global.message = jest.fn()
  global.fail = jest.fn()
  global.markdown = jest.fn()
  global.danger = {
    utils: {
      sentence: jest.fn(),
    },
    github: {
      utils: {
        fileLinks: jest.fn(f => f.join(",")),
        fileContents: jest.fn(),
      },
      api: {
        repos: {
          getContent: jest.fn(),
        },
      },
      pr: {
        head: {
          ref: "branch",
        },
      },
    },
    git: {
      modified_files: ["README.md", "CHANGELOG.md"],
      created_files: ["VISION.md"],
    },
  }
})

afterEach(() => {
  global.warn = undefined
  global.message = undefined
  global.fail = undefined
  global.markdown = undefined
  global.danger = undefined
})

describe("alexCheck()", () => {
  it("checks a file", () => {
    return alexCheck("/a/b/c", `We’ve confirmed his identity.`).then(f => {
      const markdown = global.markdown.mock.calls[0][0]
      expect(markdown).toContain(
        "`his` may be insensitive, when referring to a person, use `their`, `theirs`, `them` instead"
      )
    })
  })
})

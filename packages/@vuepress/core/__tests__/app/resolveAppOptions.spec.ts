import { resolveAppOptions } from '@vuepress/core'
import { path } from '@vuepress/utils'

describe('core > app > resolveAppOptions', () => {
  it('should create app options with default values', () => {
    const source = '/foo'

    expect(resolveAppOptions({ source })).toEqual({
      base: '/',
      lang: 'en-US',
      title: '',
      description: '',
      head: [],
      locales: {},
      theme: '@vuepress/theme-default',
      themeConfig: {},
      bundler: '@vuepress/bundler-vite',
      bundlerConfig: {},
      source,
      dest: path.resolve(source, '.vuepress/dist'),
      temp: path.resolve(source, '.vuepress/.temp'),
      cache: path.resolve(source, '.vuepress/.cache'),
      public: path.resolve(source, '.vuepress/public'),
      debug: false,
      host: '0.0.0.0',
      port: 8080,
      open: false,
      pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
      templateDev: path.normalize(
        require.resolve('@vuepress/client/templates/index.dev.html')
      ),
      templateBuild: path.normalize(
        require.resolve('@vuepress/client/templates/index.build.html')
      ),
      shouldPreload: true,
      shouldPrefetch: false,
      markdown: {},
      plugins: [],
    })
  })

  describe('should check and handle important options', () => {
    it('should insure base syntax', () => {
      // @ts-expect-error
      expect(resolveAppOptions({ base: 'base', source: '/foo' }).base).toEqual(
        '/base/'
      )
    })

    it('should ensure dest does not include source file', () => {
      const source = path.resolve(__dirname, 'foo')
      const dest = path.resolve(__dirname, 'foo/.vuepress/dist')

      expect(
        resolveAppOptions({ dest: path.resolve(__dirname), source }).dest
      ).toEqual(dest)
    })
  })
})

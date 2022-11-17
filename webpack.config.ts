import { Configuration, IgnorePlugin } from 'webpack'
import * as path from 'path'
import HtmlWebpackPlugin = require('html-webpack-plugin')
import TerserPlugin = require('terser-webpack-plugin')
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import { realpathSync } from 'fs'
import InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
import ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
import InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
import redirectServedPathMiddleware from 'react-dev-utils/redirectservedpathmiddleware'
import noopServiceWorkerMiddleware from 'react-dev-utils/noopserviceworkermiddleware'

const publicUrl = ' '
const appDirectory = realpathSync(process.cwd())
const appPath = path.resolve(appDirectory, '.')

const config: Configuration = {
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    pathinfo: true,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    publicPath: publicUrl + '/',
    devtoolModuleFilenameTemplate: (info: { absoluteResourcePath: string }) =>
      path.relative('src', info.absoluteResourcePath).replace(/\\/g, '/'),
    globalObject: 'this'
  },
  devtool: 'source-map',
  resolve: {
    // Добавить разрешения '.ts' и '.tsx' к обрабатываемым
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 5
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
          sourceMap: true
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      name: (entrypoint: { name: any }): string => `runtime-${entrypoint.name}`
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      // { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.avif$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/avif',
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{ loader: 'ts-loader' }]
          }
        ]
      }
    ]
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(
        __dirname,
        'src',
        'public',
        'index.html'
      ),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, { PUBLIC_URL: publicUrl }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicUrl,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith('.map')
        )

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        }
      }
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new ModuleNotFoundPlugin(appPath)
  ].filter(Boolean),
  performance: false
}

export default config

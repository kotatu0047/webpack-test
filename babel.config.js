// module.exports = api => ({
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         modules: false,
//       },
//     ],
//     '@babel/preset-react',
//   ],
//   plugins: ['react-hot-loader/babel'],
// })

module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
      },
    ],
    '@babel/preset-react',
  ]
  const plugins = ['react-hot-loader/babel']

  return {
    presets,
    plugins,
  }
}

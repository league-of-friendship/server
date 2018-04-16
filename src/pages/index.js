const fs = require('fs')
const md = new require('markdown-it')({
  linkify: true
})
const classy = require('markdown-it-classy')
md.use(classy)

function home(templates, req, res) {
    var html = templates.index({
      user: req.user
    })

    res.send(html)
}

function complaint(templates, req, res) {
  var html = templates.complaint({user: req.user})

  res.send(html)
}

function rules(templates, path, req, res) {
  fs.readFile(path, 'utf8', (err, data) => {
    var rules = md.render(data)
    var html = templates.rules({
      user: req.user,
      rules: rules
    })

    res.send(html)
  })
}

module.exports = (templates, path) => {
  return {
    home: {
      route: '/',
      handler: home.bind(null, templates)
    },
    complaint: {
      route: '/complaint',
      handler: complaint.bind(null, templates)
    },
    rules: {
      route: '/rules',
      handler: rules.bind(null, templates, path)
    }
  }
}

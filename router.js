// router.js 入口模組
// 職責：
//  - 處理路由
//  - 根據不同請求方法+請求路徑, 設定具體請求處理函式
// ===
// 模組值則要單一, 不要亂寫
// 劃分模組的目的就是為了增強專案的程式碼的可維護性, 提升開發效率

// Express 提供一個方式, 專門用來打包路由
const express = require('express')

// 1. 創建一個路由容器
const router = express.Router()

// 載入 CRUD 封裝好的方法
const student = require('./students')

// 2. 將路由掛載到 router 容器中

// 渲染所有學生列表
router.get('/students', (req, res) => {
  student.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    let topStudents = []
    students.forEach((item, index) => {
      if (index >= 4) return
      topStudents.push({
        name: item.name,
        age: item.age
      })
    })
    res.render('index.html', {
      topStudents: topStudents,
      students: students
    })
  })
})

// 切換至新增學生頁面
router.get('/students/new', (req, res) => {
  res.render('new.html')
})

// 新增學生的表單POST請求
router.post('/students/new', (req, res) => {
  student.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

// 渲染被編輯學生的頁面
router.get('/students/edit', (req, res) => {
  student.findById(req.query.id, function (err, student) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      student: student[0]
    })
  })
})

// 編輯學生的POST表單請求
router.post('/students/edit', (req, res) => {
  student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

// 刪除學生的請求
router.get('/students/delete', (req, res) => {
  student.delete(req.query, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

module.exports = router

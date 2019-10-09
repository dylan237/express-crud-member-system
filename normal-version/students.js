// 數據操作文件模組
// 職責：
//   操作文件中的資料, 只處理db.json資料, 不關心業務
const fs = require('fs')
const dbPath = './db.json'

// 1. 獲取所有學生列表
//    return []
exports.find = function (callback) {
  // readFile 的第二個參數事可選的, 傳入 utf8 可以告訴他把讀取到的文件找 UTF8 編髮
  // 除此以外, 也可以通過 toString() 來轉換
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

// 2 獲取編輯頁面的學生
exports.findById = function (studentID, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let student = students.filter((item) => {
      return item.id === parseFloat(studentID)
    })
    callback(null, student)
  })
}

// 3. 添加保存學生
exports.save = function (student, callback) {
  // 1. 獲取表單請求體
  // 2. 處理函式
  //      將資料保存到 db.json 中用以資料持久化
  // 3. 發送響應
  //      將 db.json 讀出來, 轉成物件
  //      往物件中 push 新增的 student 請求體
  //      然後把物件再轉成自串, 寫入 db.json
  fs.readFile (dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    student.id = parseFloat(students[students.length -1].id) + 1
    students.push(student)
    let dbData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, dbData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// 4. 更新學生
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    student.id = parseFloat(student.id)
    newStudents = students.map(item => {
      return item.id == student.id ? student : item
    })
    let dbData = JSON.stringify({
      students: newStudents
    })
    fs.writeFile(dbPath, dbData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// 5. 刪除學生
exports.delete = function (student, callback) {
  fs.readFile (dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let index = students.findIndex(function (item) {
      return item.id == student.id
    })
    students.splice(index, 1)
    let dbData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, dbData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}


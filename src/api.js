import axios from 'axios'

const search = (term) => axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${term}&printType=books&orderBy=newest&maxResults=39`)

const pagination = (term, page) => axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${term}&printType=books&orderBy=newest&maxResults=39&startIndex=${page}`)



export default {
  search,
  pagination
}
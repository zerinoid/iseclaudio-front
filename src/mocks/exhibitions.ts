import Work from '@/models/Work'

const exhibitions: Work[] = [
  {
    name: 'Lorem Ipsum Dolor Sit Amet',
    id: 1,
    images: [
      '/exhib1/img1.jpg',
      '/exhib1/img2.jpg',
      '/exhib1/img3.jpg',
      '/exhib1/img4.jpg',
      '/exhib1/img5.jpg',
      '/exhib1/img6.jpg'
    ]
  },
  {
    name: 'Consectetur Adipiscing Elit',
    id: 2,
    images: [
      '/exhib2/img1.jpg',
      '/exhib2/img2.jpg',
      '/exhib2/img3.jpg',
      '/exhib2/img4.png',
      '/exhib2/img5.jpg',
      '/exhib2/img6.jpg'
    ]
  },
  {
    name: 'Sed Do Eiusmod',
    id: 3,
    images: [
      '/exhib3/img1.jpg',
      '/exhib3/img2.png',
      '/exhib3/img3.jpg',
      '/exhib3/img4.jpg',
      '/exhib2/img1.jpg'
    ]
  },
  {
    name: 'Tempor Incididunt',
    id: 4,
    images: ['/exhib3/img2.png', '/exhib1/img4.jpg']
  },
  { name: 'Ut Labore', id: 5, images: [] }
]

export default exhibitions

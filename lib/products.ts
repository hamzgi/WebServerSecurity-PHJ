// 6주차에 MongoDB로 교체되기 전까지 사용하는 임시(in-memory) 데이터입니다.
// 함수를 async로 만들고 delay를 흉내낸 것은, 실제 DB 조회처럼 "시간이
// 걸리는 데이터 페칭"을 재현해서 Suspense/loading.tsx 동작을 보기 위함입니다.

export type Product = {
  id: string
  name: string
  description: string
  likes: number
}

const products: Product[] = [
  {
    id: '1',
    name: '엄청 비싼 노트북',
    description: '성능과 가격이 둘 다 높은 제품입니다...',
    likes: 3,
  },
  {
    id: '2',
    name: '에너지 드링크',
    description: '프로젝트 할 땐 빼놓을 수 없는 소중한 친구입니다...',
    likes: 5,
  },
  {
    id: '3',
    name: '엄청나게 가벼운 마우스',
    description: '손목에 부담이 덜 갑니다.',
    likes: 8,
  },
]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getProducts(): Promise<Product[]> {
  await delay(700) // 실제 DB 조회를 흉내내는 지연 — loading.tsx가 보이는 이유
  return products
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await delay(400)
  return products.find((p) => p.id === id)
}

export async function likeProduct(id: string): Promise<number> {
  await delay(300)
  const product = products.find((p) => p.id === id)
  if (!product) return 0
  product.likes += 1
  return product.likes
}

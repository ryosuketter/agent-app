"use client";

import {useState, useMemo} from "react";
import {Search, Filter, Star, ExternalLink, Play, Heart} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";

// モックデータ
const mockProducts = [
  {
    id: 1,
    name: "Apple MacBook Air M2",
    link: "https://example.com/macbook",
    comment:
      "軽量で持ち運びやすく、バッテリー持ちが素晴らしい。プログラミングから動画編集まで快適にこなせます。",
    photos: ["/placeholder.svg?height=300&width=400"],
    videoUrl: "https://youtube.com/watch?v=example",
    price: 164800,
    categories: ["ガジェット", "パソコン"],
    rating: 5,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    link: "https://example.com/sony-headphones",
    comment: "ノイズキャンセリング性能が抜群。長時間の使用でも疲れにくく、音質も最高レベルです。",
    photos: ["/placeholder.svg?height=300&width=400"],
    videoUrl: "",
    price: 49500,
    categories: ["ガジェット", "オーディオ"],
    rating: 5,
  },
  {
    id: 3,
    name: "バルミューダ ザ・トースター",
    link: "https://example.com/balmuda-toaster",
    comment: "食パンが驚くほど美味しく焼けます。デザインもおしゃれで、キッチンの主役になります。",
    photos: ["/placeholder.svg?height=300&width=400"],
    videoUrl: "https://youtube.com/watch?v=example2",
    price: 27940,
    categories: ["家電", "キッチン"],
    rating: 4,
  },
  {
    id: 4,
    name: "アトミック・ハビット",
    link: "https://example.com/atomic-habits",
    comment: "習慣化について科学的根拠に基づいて書かれた名著。実践的で人生が変わります。",
    photos: ["/placeholder.svg?height=300&width=400"],
    videoUrl: "",
    price: 1760,
    categories: ["本", "自己啓発"],
    rating: 5,
  },
  {
    id: 5,
    name: "Anker PowerCore 10000",
    link: "https://example.com/anker-powercore",
    comment: "コンパクトなのに大容量。旅行や外出時の必需品です。充電速度も申し分なし。",
    photos: ["/placeholder.svg?height=300&width=400"],
    videoUrl: "",
    price: 2990,
    categories: ["ガジェット", "アクセサリー"],
    rating: 4,
  },
  {
    id: 6,
    name: "ダイソン V15 Detect",
    link: "https://example.com/dyson-v15",
    comment: "レーザーでゴミが見える機能が革新的。吸引力も強く、掃除が楽しくなります。",
    photos: ["/placeholder.svg?height=300&width=400"],
    videoUrl: "https://youtube.com/watch?v=example3",
    price: 89800,
    categories: ["家電", "掃除"],
    rating: 4,
  },
];

const allCategories = Array.from(new Set(mockProducts.flatMap((p) => p.categories)));

export default function ProductComparisonSite() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => product.categories.includes(cat));
      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesCategory && matchesRating;
    });

    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "rating-asc":
          return a.rating - b.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, minRating, sortBy]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({length: 5}, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">カテゴリ</h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories((prev) => [...prev, category]);
                  } else {
                    setSelectedCategories((prev) => prev.filter((c) => c !== category));
                  }
                }}
              />
              <label htmlFor={category} className="text-sm font-medium">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">評価</h3>
        <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">すべて</SelectItem>
            <SelectItem value="1">★1以上</SelectItem>
            <SelectItem value="2">★2以上</SelectItem>
            <SelectItem value="3">★3以上</SelectItem>
            <SelectItem value="4">★4以上</SelectItem>
            <SelectItem value="5">★5のみ</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">おすすめ商品比較</h1>
            </div>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="商品名やキーワードで検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* サイドバー（デスクトップ） */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  フィルター
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <div className="flex-1">
            {/* ツールバー */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* モバイル用フィルターボタン */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      フィルター
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>フィルター</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-gray-600">{filteredAndSortedProducts.length}件の商品</p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">評価の高い順</SelectItem>
                  <SelectItem value="rating-asc">評価の低い順</SelectItem>
                  <SelectItem value="price-asc">価格の安い順</SelectItem>
                  <SelectItem value="price-desc">価格の高い順</SelectItem>
                  <SelectItem value="name-asc">名前順</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 商品グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <Image
                      src={product.photos[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                    {product.videoUrl && (
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          <Play className="w-3 h-3 mr-1" />
                          動画あり
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.comment}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        ¥{product.price.toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <a href={`/product/${product.id}`}>詳細を見る</a>
                        </Button>
                        <Button asChild size="sm">
                          <a href={product.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">条件に合う商品が見つかりませんでした。</p>
                <p className="text-gray-400 text-sm mt-2">検索条件を変更してお試しください。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

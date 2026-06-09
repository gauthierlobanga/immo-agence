/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// resources/js/Pages/immo/pages/blog/List.tsx
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DOMPurify from 'dompurify';
import {
    Clock1Icon,
    EyeIcon,
    HeartIcon,
    MessageCircleIcon,
    SearchIcon,
    XIcon,
    BookOpenIcon,
    CalendarIcon,
    TrendingUpIcon,
    FilterIcon,
    SparklesIcon,
    Loader2Icon,
    RefreshCw,
} from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import 'swiper/css';
import 'swiper/css/navigation';
import AppPublicLayout from '@/layouts/app-public-layout';
import blog from '@/routes/blog';
import type { BreadcrumbItem } from '@/types';
import type { Category } from '@/types/immo/posts/category';
import type { Post, PostsResponse } from '@/types/immo/posts/posts';
import { AnimatedPostGrid } from './AnimatedPostGrid';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: blog.index().url,
    },
];

interface Props {
    posts: PostsResponse;
    categories: {
        data: Category[];
    };
    tags?: Array<{
        id: number;
        name: string;
        slug: string;
        count?: number;
    }>;
    filters: {
        search?: string;
        tag?: string;
        category_id?: string;
        sort?: string;
        direction?: string;
        page?: number;
    };
}

const DEFAULT_SORT = 'published_at';
const DEFAULT_DIRECTION = 'desc';
const DEFAULT_SORT_VALUE = `${DEFAULT_SORT}:${DEFAULT_DIRECTION}`;

const sortOptions = [
    { value: 'published_at:desc', label: 'Plus récents', icon: TrendingUpIcon },
    { value: 'published_at:asc', label: 'Plus anciens', icon: TrendingUpIcon },
    { value: 'views_count:desc', label: 'Les plus vus', icon: EyeIcon },
    { value: 'likes_count:desc', label: 'Les plus aimés', icon: HeartIcon },
    {
        value: 'comments_count:desc',
        label: 'Les plus commentés',
        icon: MessageCircleIcon,
    },
    { value: 'title:asc', label: 'Titre A-Z', icon: BookOpenIcon },
    { value: 'title:desc', label: 'Titre Z-A', icon: BookOpenIcon },
];

type ProcessedPost = Post & {
    cleanExcerpt: string;
    formattedDate: string;
    readingTime: number;
};

function List({
    posts: initialPosts,
    categories,
    filters: initialFilters,
}: Props) {
    const cleanFilters = useCallback((filters: Props['filters']) => {
        return {
            search:
                filters.search && typeof filters.search === 'string'
                    ? filters.search
                    : '',
            tag:
                filters.tag && typeof filters.tag === 'string'
                    ? filters.tag
                    : filters.category_id &&
                        typeof filters.category_id === 'string'
                      ? filters.category_id
                      : 'all',
            sort:
                filters.sort && typeof filters.sort === 'string'
                    ? filters.sort
                    : DEFAULT_SORT,
            direction:
                filters.direction &&
                typeof filters.direction === 'string' &&
                (filters.direction === 'asc' || filters.direction === 'desc')
                    ? filters.direction
                    : DEFAULT_DIRECTION,
        };
    }, []);

    const cleanedFilters = cleanFilters(initialFilters);

    const [posts, setPosts] = useState<PostsResponse>(initialPosts);
    const [isChangingPage, setIsChangingPage] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [searchTerm, setSearchTerm] = useState(() => {
        const search = cleanedFilters.search;

        return search && search.trim() !== '' ? search.trim() : '';
    });

    const [selectedCategory, setSelectedCategory] = useState(() => {
        return cleanedFilters.tag !== 'all' ? cleanedFilters.tag : 'all';
    });

    const [selectedSort, setSelectedSort] = useState(() => {
        const sort = cleanedFilters.sort;
        const direction = cleanedFilters.direction;

        if (sort === DEFAULT_SORT && direction === DEFAULT_DIRECTION) {
            return DEFAULT_SORT_VALUE;
        }

        return `${sort}:${direction}`;
    });

    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isNavigatingRef = useRef(false);
    const previousFiltersRef = useRef<string>('');

    useEffect(() => {
        setPosts(initialPosts);
        setIsChangingPage(false);
    }, [initialPosts]);

    const getPlainExcerpt = (
        excerpt: Record<string, unknown> | string | null | undefined,
        maxLength = 120,
    ): string => {
        if (!excerpt) {
            return '';
        }

        let text = '';

        if (typeof excerpt === 'string') {
            if (excerpt.trim().startsWith('{')) {
                try {
                    const parsed = JSON.parse(excerpt) as Record<
                        string,
                        unknown
                    >;
                    text = (parsed.html ||
                        parsed.content ||
                        parsed.text ||
                        excerpt) as string;
                } catch {
                    text = excerpt;
                }
            } else {
                text = excerpt;
            }
        } else if (typeof excerpt === 'object') {
            text = (excerpt.html ||
                excerpt.content ||
                excerpt.text ||
                JSON.stringify(excerpt)) as string;
        } else {
            text = String(excerpt);
        }

        const cleanText = DOMPurify.sanitize(text, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
        });

        return cleanText.length > maxLength
            ? cleanText.substring(0, maxLength) + '...'
            : cleanText;
    };

    const processedPosts = useMemo<ProcessedPost[]>(() => {
        return posts.data.map((post) => ({
            ...post,
            cleanExcerpt: getPlainExcerpt(post.excerpt || post.content, 120),
            formattedDate: post.published_at
                ? format(new Date(post.published_at), 'dd MMMM yyyy', {
                      locale: fr,
                  })
                : 'Date non définie',
            readingTime:
                Math.ceil(
                    (post.content
                        ? JSON.stringify(post.content).length / 1000
                        : 0) / 200,
                ) || 3,
        }));
    }, [posts.data]);

    const buildFilterParams = useCallback(
        (
            overrides: {
                search?: string;
                category?: string;
                sort?: string;
                page?: number;
            } = {},
        ): Record<string, unknown> => {
            const params: Record<string, unknown> = {};
            const search =
                overrides.search !== undefined ? overrides.search : searchTerm;
            const category =
                overrides.category !== undefined
                    ? overrides.category
                    : selectedCategory;
            const sort =
                overrides.sort !== undefined ? overrides.sort : selectedSort;

            if (search && search.trim() !== '') {
                params.search = search.trim();
            }

            if (category !== 'all') {
                params.tag = category;
            }

            const [sortField, direction] = sort.split(':');

            if (sortField !== DEFAULT_SORT || direction !== DEFAULT_DIRECTION) {
                params.sort = sortField;
                params.direction = direction;
            }

            if (overrides.page && overrides.page > 1) {
                params.page = overrides.page;
            }

            return params;
        },
        [searchTerm, selectedCategory, selectedSort],
    );

    const applyFilters = useCallback(
        (params: Record<string, unknown>, isPageChange = false) => {
            const filterKey = JSON.stringify(params);

            if (filterKey === previousFiltersRef.current) {
                return;
            }

            if (isNavigatingRef.current) {
                return;
            }

            isNavigatingRef.current = true;

            if (isPageChange) {
                setIsChangingPage(true);
            }

            previousFiltersRef.current = filterKey;

            router.get(blog.index().url, params as any, {
                async: true,
                preserveState: true,
                preserveScroll: true,
                replace: true,
                showProgress: false,
                only: ['posts', 'filters'],
                onSuccess: (page) => {
                    const pageProps = page.props as unknown as {
                        posts: PostsResponse;
                        filters: Props['filters'];
                    };
                    setPosts(pageProps.posts);
                    setIsChangingPage(false);
                    isNavigatingRef.current = false;
                },
                onError: () => {
                    setIsChangingPage(false);
                    isNavigatingRef.current = false;
                },
            });
        },
        [],
    );

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value);

            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            if (value.trim() === '') {
                const params = buildFilterParams({ search: '', page: 1 });
                applyFilters(params, false);
                setIsSearching(false);

                return;
            }

            setIsSearching(true);
            searchTimeoutRef.current = setTimeout(() => {
                const params = buildFilterParams({ search: value, page: 1 });
                applyFilters(params, false);
                setIsSearching(false);
            }, 500);
        },
        [buildFilterParams, applyFilters],
    );

    const handleSearchKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }

                const params = buildFilterParams({
                    search: searchTerm,
                    page: 1,
                });
                applyFilters(params, false);
                setIsSearching(false);
                searchInputRef.current?.blur();
            } else if (e.key === 'Escape') {
                setSearchTerm('');

                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }

                const params = buildFilterParams({ search: '', page: 1 });
                applyFilters(params, false);
                setIsSearching(false);
                searchInputRef.current?.blur();
            }
        },
        [buildFilterParams, applyFilters, searchTerm],
    );

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        const params = buildFilterParams({ search: '', page: 1 });
        applyFilters(params, false);
        setIsSearching(false);
        searchInputRef.current?.focus();
    }, [buildFilterParams, applyFilters]);

    const handleCategoryChange = useCallback(
        (value: string) => {
            setSelectedCategory(value);
            const params = buildFilterParams({ category: value, page: 1 });
            applyFilters(params, false);
        },
        [buildFilterParams, applyFilters],
    );

    const handleSortChange = useCallback(
        (value: string) => {
            setSelectedSort(value);
            const params = buildFilterParams({ sort: value, page: 1 });
            applyFilters(params, false);
        },
        [buildFilterParams, applyFilters],
    );

    const handlePageChange = useCallback(
        (page: number) => {
            if (page === posts.current_page) {
                return;
            }

            const params = buildFilterParams({ page });
            applyFilters(params, true);
        },
        [posts.current_page, buildFilterParams, applyFilters],
    );

    const clearFilters = useCallback(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedSort(DEFAULT_SORT_VALUE);
        applyFilters({}, false);
    }, [applyFilters]);

    const hasActiveFilters = useMemo(() => {
        return (
            searchTerm.trim() !== '' ||
            selectedCategory !== 'all' ||
            selectedSort !== DEFAULT_SORT_VALUE
        );
    }, [searchTerm, selectedCategory, selectedSort]);

    const activeSortLabel = useMemo(() => {
        const found = sortOptions.find((opt) => opt.value === selectedSort);

        return found?.label || 'Plus récents';
    }, [selectedSort]);

    // Synchronisation des filtres depuis l'URL
    useEffect(() => {
        const urlSearch = initialFilters.search || '';
        const urlCategory =
            initialFilters.tag || initialFilters.category_id || 'all';
        const urlSort = initialFilters.sort || DEFAULT_SORT;
        const urlDirection = initialFilters.direction || DEFAULT_DIRECTION;
        const urlSortValue = `${urlSort}:${urlDirection}`;

        if (urlSearch !== searchTerm) {
            setSearchTerm(urlSearch);
        }

        if (urlCategory !== selectedCategory) {
            setSelectedCategory(urlCategory);
        }

        if (urlSortValue !== selectedSort) {
            setSelectedSort(urlSortValue);
        }
    }, [initialFilters, searchTerm, selectedCategory, selectedSort]);

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const PostCard = ({ post }: { post: ProcessedPost }) => (
        <Link href={blog.show(post.slug).url} className="group block h-full">
            <Card className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10 dark:border-slate-800 dark:bg-slate-900/60">
                {/* Image */}
                <div className="relative overflow-hidden">
                    {post.featured_image_url ? (
                        <>
                            <img
                                src={post.featured_image_url}
                                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                        </>
                    ) : (
                        <div className="flex h-52 items-center justify-center bg-linear-to-br from-teal-100 to-slate-200 dark:from-teal-900/30 dark:to-slate-800">
                            <BookOpenIcon className="h-10 w-10 text-teal-600/40 dark:text-teal-400/40" />
                        </div>
                    )}
                    <div className="absolute right-3 bottom-3">
                        <Badge className="bg-black/50 text-white backdrop-blur">
                            {post.readingTime} min
                        </Badge>
                    </div>
                </div>

                <CardContent className="space-y-4 p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 transition group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                        {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                        {post.cleanExcerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{post.formattedDate}</span>
                        <div className="flex gap-3">
                            <span className="flex items-center gap-1">
                                <EyeIcon className="h-3 w-3" />
                                {post.views_count}
                            </span>
                            <span className="flex items-center gap-1">
                                <HeartIcon className="h-3 w-3" />
                                {post.likes_count}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={post.user?.avatar_url} />
                            <AvatarFallback>
                                {post.user?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                            {post.user?.name}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );

    return (
        <>
            <Head title="Blog " />

            <section className="relative overflow-hidden py-18">
                {/* Background premium avec teal/slate */}
                <div className="absolute inset-0 bg-linear-to-b from-teal-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
                <div className="absolute inset-0 backdrop-blur-[2px]" />

                {/* Glow effects */}
                <div className="absolute -top-32 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-800/20" />
                <div className="absolute bottom-0 left-0 h-75 w-75 bg-slate-300/30 blur-3xl dark:bg-slate-700/20" />

                <div className="relative mx-auto max-w-6xl px-4 text-center">
                    <Badge className="mb-6 border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm text-teal-700 backdrop-blur dark:border-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                        <SparklesIcon className="mr-2 h-4 w-4" />
                        Blog & Insights
                    </Badge>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                        Explorez des contenus
                        <span className="mt-2 block bg-linear-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">
                            inspirants & modernes
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Découvrez des articles de qualité sur le développement,
                        l’e-commerce et les technologies modernes.
                    </p>

                    {/* SEARCH */}
                    <div className="mx-auto mt-10 max-w-xl">
                        <div className="group relative">
                            <div className="absolute inset-0 rounded-full bg-linear-to-r from-teal-500/20 to-teal-400/20 opacity-0 blur transition group-focus-within:opacity-100" />
                            <div className="relative">
                                <Input
                                    ref={searchInputRef}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        handleSearchChange(e.target.value)
                                    }
                                    onKeyDown={handleSearchKeyDown}
                                    placeholder="Rechercher un article..."
                                    className="h-14 rounded-full border border-slate-200 bg-white/60 pr-12 pl-12 text-base shadow-xl backdrop-blur focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
                                />
                                <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                {searchTerm && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="absolute top-1/2 right-4 -translate-y-1/2"
                                    >
                                        <XIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-8 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4">
                    {/* Filtres améliorés */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Catégories Swiper */}
                        <div className="flex w-full items-center gap-3 sm:w-auto">
                            <FilterIcon className="h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400" />
                            <span className="hidden text-sm font-medium text-slate-600 sm:inline dark:text-slate-300">
                                Filtres :
                            </span>
                            <div className="relative w-full sm:max-w-2xl">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={8}
                                    slidesPerView="auto"
                                    freeMode={true}
                                    navigation={{
                                        prevEl: '.custom-prev',
                                        nextEl: '.custom-next',
                                    }}
                                    className="flex items-center"
                                >
                                    <SwiperSlide className="w-auto!">
                                        <Badge
                                            variant={
                                                selectedCategory === 'all'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105 hover:shadow-md ${
                                                selectedCategory === 'all'
                                                    ? 'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-700 dark:hover:bg-slate-800'
                                            }`}
                                            onClick={() =>
                                                handleCategoryChange('all')
                                            }
                                        >
                                            Tous
                                        </Badge>
                                    </SwiperSlide>
                                    {categories.data.map((category) => (
                                        <SwiperSlide
                                            key={category.id}
                                            className="w-auto!"
                                        >
                                            <Badge
                                                variant={
                                                    selectedCategory ===
                                                    category.slug
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105 hover:shadow-md"
                                                style={
                                                    selectedCategory ===
                                                    category.slug
                                                        ? {
                                                              backgroundColor:
                                                                  category.color ||
                                                                  '#0d9488',
                                                          }
                                                        : {
                                                              borderColor:
                                                                  category.color ||
                                                                  '#0d9488',
                                                              color:
                                                                  category.color ||
                                                                  '#0d9488',
                                                          }
                                                }
                                                onClick={() =>
                                                    handleCategoryChange(
                                                        category.slug,
                                                    )
                                                }
                                            >
                                                {category.nom}
                                            </Badge>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button className="custom-prev absolute top-1/2 -left-3 z-10 -translate-y-1/2 rounded-full border-0 bg-white/80 p-1 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg dark:bg-slate-800/80 dark:hover:bg-slate-700">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="custom-next absolute top-1/2 -right-3 z-10 -translate-y-1/2 rounded-full border-0 bg-white/80 p-1 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg dark:bg-slate-800/80 dark:hover:bg-slate-700">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Tri + Reset */}
                        <div className="flex items-center gap-3">
                            <Select
                                value={selectedSort}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="h-9 w-44 rounded-full border border-slate-200 bg-white/50 text-sm backdrop-blur-sm transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/50 dark:text-white">
                                    <SelectValue>{activeSortLabel}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((option) => {
                                        const IconComponent = option.icon;

                                        return (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <IconComponent className="h-3.5 w-3.5" />
                                                    {option.label}
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-9 cursor-pointer gap-1.5 rounded-full text-sm text-slate-600 transition-all hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-900/20 dark:hover:text-rose-400"
                                >
                                    <RefreshCw className="h-5 w-5" />
                                    <span className="hidden sm:inline">
                                        Réinitialiser
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Compteur et indicateur de chargement */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-slate-900 dark:text-white">
                                {posts.total || 0}
                            </span>
                            {posts.total > 1 ? ' articles' : ' article'}
                        </p>
                        {isChangingPage && (
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <div className="h-3 w-3 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                                <span>Chargement...</span>
                            </div>
                        )}
                    </div>

                    {/* Liste d'articles */}
                    {processedPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="rounded-full bg-slate-100 p-6 dark:bg-slate-800">
                                <BookOpenIcon className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                                Aucun article trouvé
                            </h3>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Essayez de modifier vos filtres ou revenez plus
                                tard.
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    className="mt-6 rounded-full border-teal-300 text-teal-600 hover:bg-teal-50 dark:border-teal-700 dark:text-teal-400 dark:hover:bg-teal-900/20"
                                    onClick={clearFilters}
                                >
                                    Réinitialiser les filtres
                                </Button>
                            )}
                        </div>
                    ) : (
                        <AnimatedPostGrid
                            posts={processedPosts}
                            renderItem={(post) => <PostCard post={post} />}
                        />
                    )}

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <Pagination className="mt-12">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            if (posts.current_page > 1) {
                                                handlePageChange(
                                                    posts.current_page - 1,
                                                );
                                            }
                                        }}
                                        className={
                                            posts.current_page === 1
                                                ? 'pointer-events-none text-slate-400 opacity-50'
                                                : 'cursor-pointer rounded-full transition-all hover:bg-teal-50 dark:hover:bg-teal-900/20'
                                        }
                                    />
                                </PaginationItem>

                                {Array.from(
                                    { length: Math.min(5, posts.last_page) },
                                    (_, i) => {
                                        let pageNum;

                                        if (posts.last_page <= 5) {
                                            pageNum = i + 1;
                                        } else if (posts.current_page <= 3) {
                                            pageNum = i + 1;
                                        } else if (
                                            posts.current_page >=
                                            posts.last_page - 2
                                        ) {
                                            pageNum = posts.last_page - 4 + i;
                                        } else {
                                            pageNum =
                                                posts.current_page - 2 + i;
                                        }

                                        return (
                                            <PaginationItem key={pageNum}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(
                                                            pageNum,
                                                        );
                                                    }}
                                                    isActive={
                                                        posts.current_page ===
                                                        pageNum
                                                    }
                                                    className={`rounded-full transition-all ${
                                                        posts.current_page ===
                                                        pageNum
                                                            ? 'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
                                                            : 'hover:bg-teal-50 dark:hover:bg-teal-900/20'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    },
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            if (
                                                posts.current_page <
                                                posts.last_page
                                            ) {
                                                handlePageChange(
                                                    posts.current_page + 1,
                                                );
                                            }
                                        }}
                                        className={
                                            posts.current_page ===
                                            posts.last_page
                                                ? 'pointer-events-none text-slate-400 opacity-50'
                                                : 'cursor-pointer rounded-full transition-all hover:bg-teal-50 dark:hover:bg-teal-900/20'
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </section>

            <style>{`
                .bg-grid-pattern {
                    background-image: radial-linear(circle, currentColor 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>
        </>
    );
}

List.layout = (page: React.ReactNode) => (
    <AppPublicLayout breadcrumbs={breadcrumbs}>{page}</AppPublicLayout>
);

export default List;

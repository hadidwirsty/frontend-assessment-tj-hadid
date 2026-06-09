import { useEffect, useRef, useCallback } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

interface UseInfiniteListProps<T> {
  queryKey: unknown[]
  fetchFn: (params: {
    pageParam: number
    signal?: AbortSignal
  }) => Promise<{ data: T[] }>
  limit?: number
}

export function useInfiniteList<T>({
  queryKey,
  fetchFn,
  limit = 20,
}: UseInfiniteListProps<T>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length === limit ? allPages.length + 1 : undefined
    },
  })

  const observer = useRef<IntersectionObserver | null>(null)

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  )

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  const items = data?.pages.flatMap((page) => page.data) || []

  return {
    items,
    loading: isLoading || isFetchingNextPage,
    hasMore: hasNextPage,
    error,
    sentinelRef,
  }
}

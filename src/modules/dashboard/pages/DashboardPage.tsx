import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { AnalyticsDonutCard } from '@/modules/dashboard/components/AnalyticsDonutCard';
import { useItemAnalytics } from '@/modules/items/hooks/useItemAnalytics';
import { EmptyState } from '@/shared/components/EmptyState';
import { PageHeader } from '@/shared/components/PageHeader';

const statusLabelMap = {
  available: 'Disponível',
  donated: 'Doado',
  expired: 'Expirado',
} as const;

const statusColorMap = {
  available: 'var(--chakra-colors-green-500)',
  donated: 'var(--chakra-colors-yellow-400)',
  expired: 'var(--chakra-colors-red-500)',
} as const;

const categoryChartColors = [
  'var(--chakra-colors-brand-500)',
  'var(--chakra-colors-green-500)',
  'var(--chakra-colors-orange-400)',
  'var(--chakra-colors-blue-500)',
  'var(--chakra-colors-pink-500)',
  'var(--chakra-colors-teal-500)',
  'var(--chakra-colors-yellow-500)',
  'var(--chakra-colors-cyan-500)',
];

export function DashboardPage() {
  const { user } = useAuth();
  const hasCondominiumAssigned = Boolean(user?.condominium_id);
  const itemAnalyticsQuery = useItemAnalytics({
    enabled: hasCondominiumAssigned,
  });
  const analytics = itemAnalyticsQuery.data;

  const statusData = analytics
    ? Object.entries(analytics.status).map(([key, value]) => ({
        key,
        label: statusLabelMap[key as keyof typeof statusLabelMap],
        value,
        color: statusColorMap[key as keyof typeof statusColorMap],
      }))
    : [];

  const categoriesData =
    analytics?.categories.map((category, index) => ({
      key: category.id,
      label: category.name,
      value: category.count,
      color: categoryChartColors[index % categoryChartColors.length],
    })) ?? [];

  return (
    <Stack gap={6}>
      <PageHeader
        title='Dashboard'
        description='Acompanhe a distribuição de itens do seu condomínio por status e categoria.'
      />

      {!hasCondominiumAssigned ? (
        <EmptyState message='Você ainda não possui um condomínio atribuído. Faça sua solicitação na página de condomínios.' />
      ) : (
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap={6}>
          <AnalyticsDonutCard
            title='Itens por status'
            description='Distribuição atual dos itens do condomínio por situação.'
            centerLabel='itens'
            data={statusData}
            isLoading={itemAnalyticsQuery.isLoading}
            emptyMessage='Ainda não há itens suficientes para exibir a análise por status.'
          />

          <AnalyticsDonutCard
            title='Itens por categoria'
            description='Categorias com itens cadastrados no condomínio do usuário.'
            centerLabel='categorias'
            data={categoriesData}
            isLoading={itemAnalyticsQuery.isLoading}
            emptyMessage='Ainda não há categorias com itens cadastrados para análise.'
          />
        </SimpleGrid>
      )}
    </Stack>
  );
}

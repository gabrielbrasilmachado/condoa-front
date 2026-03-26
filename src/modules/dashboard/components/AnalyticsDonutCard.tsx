import { Chart, useChart } from '@chakra-ui/charts'
import { Box, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

type AnalyticsDatum = {
  key: string
  label: string
  value: number
  color: string
}

type AnalyticsDonutCardProps = {
  title: string
  description: string
  centerLabel: string
  data: AnalyticsDatum[]
  isLoading?: boolean
  emptyMessage: string
}

export function AnalyticsDonutCard({
  title,
  description,
  centerLabel,
  data,
  isLoading,
  emptyMessage,
}: AnalyticsDonutCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const chart = useChart({ data })

  return (
    <Box
      bg='rgba(248,250,248,0.9)'
      p={{ base: 5, md: 6 }}
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.500'
    >
      <Text fontSize='lg' fontWeight='semibold'>
        {title}
      </Text>
      <Text mt={2} color='gray.700'>
        {description}
      </Text>

      {isLoading ? (
        <Stack align='center' justify='center' minH='320px'>
          <Spinner color='brand.500' />
          <Text color='gray.700'>Carregando dados...</Text>
        </Stack>
      ) : total === 0 ? (
        <Stack align='center' justify='center' minH='320px'>
          <Text color='gray.700' textAlign='center'>
            {emptyMessage}
          </Text>
        </Stack>
      ) : (
        <Stack mt={6} gap={4} direction='column' align='center'>
          <Box w='full' maxW='320px' mx='auto' p={{ base: 2, md: 3 }}>
            <Box h={{ base: '240px', md: '240px' }} w='full'>
              <Chart.Root chart={chart}>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Tooltip cursor={false} content={<Chart.Tooltip hideLabel indicator='dot' />} />
                    <Pie
                      data={chart.data}
                      dataKey={chart.key('value')}
                      nameKey={chart.key('label')}
                      cx='50%'
                      cy='50%'
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={0}
                      cornerRadius={10}
                      stroke='none'
                    >
                      {chart.data.map((item) => (
                        <Cell key={item.key} fill={item.color} />
                      ))}
                      <Label
                        content={({ viewBox }) => (
                          <Chart.RadialText
                            viewBox={viewBox}
                            title={total}
                            description={centerLabel}
                          />
                        )}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Chart.Root>
            </Box>
          </Box>

          <Stack w='full' gap={2}>
            {data.map((item) => {
              const percent = total ? Math.round((item.value / total) * 100) : 0

              return (
                <HStack
                  key={item.key}
                  justify='space-between'
                  gap={4}
                  py={3}
                  px={4}
                  borderRadius='lg'
                  border='1px solid'
                  borderColor='whiteAlpha.400'
                  bg='rgba(255,255,255,0.32)'
                >
                  <HStack gap={3} minW='0'>
                    <Box boxSize='10px' borderRadius='full' bg={item.color} flexShrink={0} />
                    <Text fontWeight='medium' truncate>
                      {item.label}
                    </Text>
                  </HStack>
                  <HStack gap={3} flexShrink={0} color='gray.700'>
                    <Text fontWeight='semibold'>{item.value}</Text>
                    <Text fontSize='sm'>{percent}%</Text>
                  </HStack>
                </HStack>
              )
            })}
          </Stack>
        </Stack>
      )}
    </Box>
  )
}



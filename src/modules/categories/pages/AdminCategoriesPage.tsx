import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { CategoriesTable } from '@/modules/categories/components/CategoriesTable';
import { CategoryForm } from '@/modules/categories/components/CategoryForm';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import { useCreateCategory } from '@/modules/categories/hooks/useCreateCategory';
import { useDeleteCategory } from '@/modules/categories/hooks/useDeleteCategory';
import { useUpdateCategory } from '@/modules/categories/hooks/useUpdateCategory';
import type { CategoryFormData } from '@/modules/categories/schemas/category-form.schema';
import type { Category } from '@/modules/categories/types/category.types';
import { AppModal } from '@/shared/components/AppModal';
import { EmptyState } from '@/shared/components/EmptyState';
import { LoadingState } from '@/shared/components/LoadingState';
import { PageHeader } from '@/shared/components/PageHeader';
import { toaster } from '@/shared/components/ui/toaster';
import { getErrorMessage } from '@/shared/lib/http/http-error';

export function AdminCategoriesPage() {
  const formModal = useDisclosure();
  const { data, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const categories = data ?? [];

  function closeFormModal() {
    setSelectedCategory(null);
    formModal.onClose();
  }

  function openCreateModal() {
    setSelectedCategory(null);
    formModal.onOpen();
  }

  function openEditModal(category: Category) {
    setSelectedCategory(category);
    formModal.onOpen();
  }

  async function handleCreate(values: CategoryFormData) {
    try {
      await createMutation.mutateAsync(values);
      closeFormModal();
      toaster.success({ title: 'Categoria criada com sucesso.' });
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) });
    }
  }

  async function handleUpdate(values: CategoryFormData) {
    if (!selectedCategory) {
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: selectedCategory.id,
        payload: values,
      });
      closeFormModal();
      toaster.success({ title: 'Categoria atualizada com sucesso.' });
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) });
    }
  }

  async function handleDelete(category: Category) {
    try {
      await deleteMutation.mutateAsync(category.id);
      toaster.success({ title: 'Categoria removida com sucesso.' });
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) });
    }
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <PageHeader
        title='Categorias'
        description='Gerencie a criação e edição de categorias.'
        action={<Button onClick={openCreateModal}>Nova categoria</Button>}
      />

      {!categories.length ? (
        <EmptyState message='Nenhuma categoria cadastrada até o momento.' />
      ) : (
        <CategoriesTable
          categories={categories}
          deletingCategoryId={
            deleteMutation.isPending ? deleteMutation.variables : null
          }
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      <AppModal
        isOpen={formModal.open}
        onClose={closeFormModal}
        title={selectedCategory ? 'Editar categoria' : 'Nova categoria'}
      >
        <Text mb={5} color='gray.600'>
          As categorias seguem o mesmo schema do backend.
        </Text>
        <CategoryForm
          category={selectedCategory}
          isLoading={createMutation.isPending || updateMutation.isPending}
          onCancel={closeFormModal}
          onSubmit={selectedCategory ? handleUpdate : handleCreate}
        />
      </AppModal>
    </>
  );
}

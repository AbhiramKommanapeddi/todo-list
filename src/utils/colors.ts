// Color utilities for consistent styling
export const colors = {
  priority: {
    high: {
      bg: '#FEE2E2',
      text: '#991B1B',
      border: '#FCA5A5'
    },
    medium: {
      bg: '#FEF3C7',
      text: '#92400E',
      border: '#FCD34D'
    },
    low: {
      bg: '#D1FAE5',
      text: '#065F46',
      border: '#6EE7B7'
    }
  },
  status: {
    complete: {
      bg: '#DEF7EC',
      text: '#03543F',
      border: '#84E1BC'
    },
    'in-progress': {
      bg: '#E0E7FF',
      text: '#3730A3',
      border: '#A5B4FC'
    },
    incomplete: {
      bg: '#FEE2E2',
      text: '#991B1B',
      border: '#FCA5A5'
    },
    hold: {
      bg: '#FEF3C7',
      text: '#92400E',
      border: '#FCD34D'
    }
  },
  getDueDateColor: (date: string) => {
    const today = new Date();
    const dueDate = new Date(date);
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { bg: '#FEE2E2', text: '#991B1B' }; // Overdue
    if (diffDays === 0) return { bg: '#FEF3C7', text: '#92400E' }; // Due today
    if (diffDays <= 3) return { bg: '#E0E7FF', text: '#3730A3' }; // Coming soon
    return { bg: '#D1FAE5', text: '#065F46' }; // Future
  }
};
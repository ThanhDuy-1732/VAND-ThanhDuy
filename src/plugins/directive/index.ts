export const visibleDirective = (el, binding) => {
  el.style.visibility = !!binding.value ? 'visible' : 'hidden';
}
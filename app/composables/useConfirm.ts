interface ConfirmParams {
  title: string
  message: string
  label: string
  action: () => void
}

const confirming = ref<boolean>(false);

const params = ref<ConfirmParams>({
  title: 'Title',
  message: 'Description',
  label: 'Confirm',
  action: () => {}
});

export default () => {
  const confirm = (title: string, message: string, label: string, action: () => void) => {
    const actionAndClose = () => {
      confirming.value = false;
      action();
    };

    params.value = { title, message, label, action: actionAndClose };
    confirming.value = true;
  };

  return { confirm, confirming, params };
}

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import Dialog from '@/components/ui/dialog';
import { useMutationCreateGalleryItem } from '@/hooks/gallery';
import { useIsMounted } from '@/hooks/useIsMounted';
import { CreateGalleryItemParam, GalleryType } from '@/lib/api/type';
import { galleryTapeAddDialogOpenAtom } from '@/store/gallery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import { z } from 'zod';
import { Button } from '../../button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../form';
import ImageView from '../../imageView';
import { Input } from '../../input';

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: '不能为空哦(｡ŏ_ŏ)' }),
  cover: z.string().url({ message: '不是合法的URL(｡ŏ_ŏ)' }).optional(),
  images: z.array(
    z.object({
      url: z.string().url({ message: '不是合法的URL(｡ŏ_ŏ)' }),
    }),
  ),
  org: z.string().optional(),
});
export default function GalleryTapeAddDialog() {
  const [isOpen, setIsOpen] = useAtom(galleryTapeAddDialogOpenAtom);
  const { mutate } = useMutationCreateGalleryItem();
  const isMounted = useIsMounted();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitData: CreateGalleryItemParam = {
      ...data,
      images: data.images.map((item) => item.url),
      itemType: GalleryType.TAPE,
    };
    mutate(submitData);
  }

  if (!isMounted) return null;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[50%] w-[768px] md:max-h-[80%] md:w-full md:overflow-auto desktop:w-[1000px]"
      render={() => (
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-semibold">添加新胶带</h2>
          <ErrorBoundary>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>胶带名称</FormLabel>
                      <FormControl>
                        <Input placeholder="一般是【名称】+ 材质 つ♡⊂" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="cover"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>主图（封面）</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="输入 URL 哦 つ♡⊂ 后续会改成上传  选填哦" {...field} />
                          </FormControl>
                          <ImageView src={field.value} className="max-h-[200px] w-full object-cover" /> <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="org"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>社团</FormLabel>
                          <FormControl>
                            <Input placeholder="社团 つ♡⊂ 选填哦" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      其他图片
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => append({ url: 'https://backblaze.cosine.ren/source/gallery/tapes/' })}
                      >
                        添加图片URL
                      </Button>
                    </div>
                    <div className="flex max-h-[200px] w-full flex-col gap-1 overflow-auto">
                      {fields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`images.${index}.url`} // Update the name to point to the url property
                          render={({ field }) => (
                            <FormItem className="flex flex-col gap-0.5">
                              <div className="flex w-full items-center justify-between gap-2">
                                <FormLabel className="text-lg">{index + 1}</FormLabel>
                                <FormControl>
                                  <Input placeholder="输入 URL" {...field} />
                                </FormControl>
                                <ImageView src={field.value} className="aspect-square h-10 object-cover" />
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  type="button"
                                  className="whitespace-nowrap"
                                  onClick={() => remove(index)}
                                >
                                  删除
                                </Button>
                              </div>
                              <FormMessage style={{ marginTop: 0 }} />
                            </FormItem>
                          )}
                        />
                      ))}
                      <div
                        className="flex-center mt-1 cursor-pointer rounded-lg bg-background py-4"
                        onClick={() => append({ url: 'https://backblaze.cosine.ren/source/gallery/tapes/' })}
                      >
                        <FaPlus className="text-2xl" />
                      </div>
                    </div>
                    <div className="flex max-h-[200px] flex-wrap items-center justify-center gap-2 overflow-auto">
                      {fields.map((field, index) => (
                        <div className="relative h-40 w-40" key={field.id}>
                          <ImageView desc={`图片${index + 1}`} src={field.url} className="aspect-square h-full object-cover" />
                          <AiFillCloseCircle
                            onClick={() => remove(index)}
                            className="absolute -right-0.5 -top-0.5 cursor-pointer text-2xl text-destructive"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </ErrorBoundary>
        </div>
      )}
    />
  );
}

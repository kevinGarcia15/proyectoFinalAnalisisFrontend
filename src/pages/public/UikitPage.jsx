import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import { Navigation } from '../../components/Navigation'

export const Uikit = () => (
  <>
    <Navigation />
    <div className='flex flex-col gap-4 items-center'>
      <h2 className='font-bold text-4xl'>Buttons</h2>
      <div className='flex flex-col gap-2'>
        <Button>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='tertiary'>Tertiary</Button>
        <Button variant='info'>Info</Button>
        <Button variant='warning'>Warning</Button>
        <Button variant='success'>Success</Button>
        <Button variant='danger'>Danger</Button>
        <Button variant='link'>Link</Button>
        <Button variant='ghost'>Ghost</Button>
      </div>
      <h2 className='font-bold text-4xl'>Avatar</h2>
      <Avatar>
        <AvatarImage src='https://i.pravatar.cc/300' />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <h2 className='font-bold text-4xl'>Inputs</h2>
      <div className='flex flex-col gap-2 p-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' placeholder='Your email' />
        <Input type='number' placeholder='Your phone number' />
        <Input type='password' placeholder='Your password' />
        <Input type='file' placeholder='Upload your file' />
        <Textarea placeholder='Your message' />
        <RadioGroup>
          <div className='flex gap-2'>
            <Label htmlFor='option-one'>Option 1</Label>
            <RadioGroupItem value='option-one' id='option-one' />
          </div>
          <div className='flex gap-2'>
            <Label htmlFor='option-two'>Option 2</Label>
            <RadioGroupItem value='option-two' id='option-two' />
          </div>
        </RadioGroup>
        <div className='flex gap-2 items-center'>
          <Checkbox id='terms' />
          <Label htmlFor='terms'>I accept the terms and conditions</Label>
        </div>
        <Switch />
      </div>
      <h2 className='font-bold text-4xl'>Accordion</h2>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Accordion 1</AccordionTrigger>
          <AccordionContent>
            <p>Content 1</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Accordion 2</AccordionTrigger>
          <AccordionContent>
            <p>Content 2</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Accordion 3</AccordionTrigger>
          <AccordionContent>
            <p>Content 3</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className='font-bold text-4xl'>Select</h2>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
      <h2 className='font-bold text-4xl'>Tarjeta</h2>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Input id='name' placeholder='Name of your project' />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
      <h2 className='font-bold text-4xl'>Separator</h2>
      <p>Content 1</p>
      <Separator />
      <p>Content 2</p>
      <h2 className='font-bold text-4xl'>Tooltip</h2>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </>
)

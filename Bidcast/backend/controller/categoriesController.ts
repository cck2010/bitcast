import { Request, Response } from "express";
import { CategoriesService } from "../service/categoriesService";

export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    categoriesFilter = async (req: Request, res: Response) => {
        try {
            const { categoryId } = req.body
            const result = await this.categoriesService.categoriesFilter(categoryId)
            res.json(result)
        } catch (error) {
            res.json({
                success: false,
                data: { msg: "controller get categories fail" },
                error: new Error("get categories fail"),
            });
        }
    }
}